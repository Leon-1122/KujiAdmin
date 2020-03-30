module.exports = {


  friendlyName: 'WeChat pay',


  description: 'WeChat pay',


  inputs: {
    payment: {
      type: 'number',
      required: true
    },

  },


  exits: {
    success: {
      description: 'WeChat pay success.',
    },

    wxuserNotExist: {
      description: `Wxuser not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    if (!this.req.headers.userid) {
      throw "wxuserNotExist";
    }

    const userId = this.req.headers.userid;
    let userInfo = await WxUser.findOne({id: userId});

    if (!userInfo) {
      throw "wxuserNotExist";
    }

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
    const tradeNo = Date.parse(new Date()) + Math.round(1e3 * Math.random());
    const body = '奖券';
    const spbill_create_ip = ip.address() || '127.0.0.1';
    const notify_url = sails.config.custom.notifyurl;
    const total_fee = inputs.payment;
    const time_stamp = '' + Math.ceil(Date.now() / 1000);
    const out_trade_no = `${tradeNo}`;
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

    sails.log('微信支付统一下单调用结果:\n', restData);

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

      // TODO 订单数据插入到数据库
      const orderId = '1';

      return {
        code: 0,
        data: {
          nonceStr: nonce_str,
          paySign: sign,
          signType: 'MD5',
          timeStamp: time_stamp,
          package: package1,
          orderId: orderId
        },
        msg: 'OK'
      };

    } else {
      return ({
        code: -6,
        msg: 'wechat pay failed',
      });
    }
  }

};
