module.exports = {


  friendlyName: 'WeChat pay',


  description: 'WeChat pay',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },
    num: {
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'WeChat pay success.',
    },

    wxUserNotExist: {
      description: `WxUser not exist.`,
      responseType: 'badRequest'
    },

    lotteryNotExist: {
      description: `Lottery not exist.`,
      responseType: 'badRequest'
    },

    machineNotExist: {
      description: `Machine not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    if (!this.req.headers.userid) {
      throw "wxUserNotExist";
    }

    const userId = this.req.headers.userid;
    let userInfo = await WxUser.findOne({id: userId});

    if (!userInfo) {
      throw "wxUserNotExist";
    }

    // 获取一番赏信息
    const lotteryInfo = await MachineLottery.findOne({id: inputs.lotteryId});
    if (!lotteryInfo) {
      throw "lotteryNotExist";
    }

    const machineInfo = await Machine.find({machine_id: lotteryInfo.machineId});
    if (machineInfo.length === 0) {
      throw "machineNotExist";
    }

    // 检测是否超时
    const timestamp = Date.now();
    let queueList = await Queue.find({
        lotteryId: inputs.lotteryId,
        userId: userId,
        status: 2
      }
    );

    if (queueList.length === 0) {
      return ({
        code: -10,
        msg: 'operation timeout',
      });
    } else if (timestamp - queueList[0].updatedAt > 60000) {
      // 更新队列状态为完成
      await Queue.update({
          lotteryId: inputs.lotteryId,
          userId: userId,
          status: 2,
        }
      ).set({
        status: 3
      });

      return ({
        code: -10,
        msg: 'operation timeout',
      });
    }

    const machineId = machineInfo[0].id;
    const payment = lotteryInfo.price * inputs.num;

    const {
      WXPay,
      WXPayConstants,
      WXPayUtil
    } = require('wx-js-utils');

    const ip = require('ip');

    const MCHID = sails.config.custom.mchid,
      KEY = sails.config.custom.key,
      TIMEOUT = sails.config.custom.timeout,
      APPID = sails.config.custom.appid;

    // 拼凑微信支付统一下单的参数
    const orderNo = Date.parse(new Date()) + Math.round(1e3 * Math.random());
    const body = `一番赏 ${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`;
    const spbill_create_ip = ip.address() || '127.0.0.1';
    const notify_url = sails.config.custom.baseUrl + '/api/v1/wx/wechatPayNotify';
    const total_fee = payment * 100;
    const time_stamp = '' + Math.ceil(Date.now() / 1000);
    const out_trade_no = `${orderNo}`;
    const sign_type = WXPayConstants.SIGN_TYPE_MD5;

    const wxpay = new WXPay({
      appId: APPID,
      mchId: MCHID,
      key: KEY,
      timeout: TIMEOUT,
      signType: sign_type,
      useSandbox: false // 不使用沙箱环境
    });

    let orderParam = {
      body,
      spbill_create_ip,
      notify_url,
      out_trade_no,
      total_fee,
      openid: userInfo.openid,
      trade_type: 'JSAPI'
    };

    // 调用 wx-js-utils 中的统一下单方法
    const {
      return_code,
      ...restData
    } = await wxpay.unifiedOrder(orderParam);

    sails.log.info('微信支付统一下单调用结果:\n', JSON.stringify(restData));

    if (return_code === 'SUCCESS' && restData.result_code === 'SUCCESS') {
      const {
        prepay_id,
        nonce_str
      } = restData;

      // 微信小程序支付要单独进地签名，并返回给小程序端
      const package1 = `prepay_id=${prepay_id}`;
      const sign = WXPayUtil.generateSignature({
        appId: APPID,
        nonceStr: nonce_str,
        package: package1,
        signType: 'MD5',
        timeStamp: time_stamp
      }, KEY);

      // 订单数据插入到数据库
      let orderInfo = {
        orderNo: orderNo,
        buyerNick: userInfo.nickName,
        machineId: lotteryInfo.machineId,
        wxUser: userId,
        machine: machineId,
        lottery: inputs.lotteryId,
        status: 0,
        title: body,
        price: lotteryInfo.price,
        num: inputs.num,
        totalFee: payment,
      };

      const newOrder = await Order.create(orderInfo).fetch();

      return {
        code: 0,
        data: {
          nonceStr: nonce_str,
          paySign: sign,
          signType: 'MD5',
          timeStamp: time_stamp,
          package: package1,
          orderId: newOrder.id
        },
        msg: 'OK'
      };

    } else {
      return ({
        code: -4,
        msg: 'wechat pay failed',
      });
    }
  }

};
