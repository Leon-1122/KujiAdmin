module.exports = {


  friendlyName: 'WeChat pay notify',


  description: 'WeChat pay notify',


  inputs: {},


  exits: {
    success: {
      description: 'WeChat pay notify success.',
    },
  },


  fn: async function (inputs) {
    const {
      WXPay
    } = require('wx-js-utils');

    const MCHID = sails.config.custom.mchid,
      KEY = sails.config.custom.key,
      APPID = sails.config.custom.appid;

    const wxpay = new WXPay({
      appId: APPID,
      mchId: MCHID,
      key: KEY,
    });

    const data = this.req.body.xml;

    // 验证签名
    if (wxpay.isPayResultNotifySignatureValid(data)) {
      console.log('success');
      if (data.result_code === 'SUCCESS') {
        // 验证订单金额是否正确
        const orderInfo = await Order.findOne({orderNo: data.out_trade_no});
        if (!orderInfo || orderInfo.totalFee * 100 !== parseInt(data.total_fee)) {
          throw new Error('Invalid total fee: ' + data.total_fee);
        }

        // 更新订单状态和支付时间
        if (orderInfo.status === 0) {
          await Order.updateOne({orderNo: data.out_trade_no}).set({
            status: 1,
            payTime: strToDate(data.time_end).getTime(),
            notifyData: data
          });
        }

        const sendData = {
          return_code: 'SUCCESS',
          return_msg: 'OK'
        };
        this.res.end(json2Xml(sendData));
      }
    } else {
      throw new Error('Invalid sign: ' + data.sign);
    }

  }
};

function json2Xml(json) {
  let _xml = '';
  Object.keys(json).map((key) => {
    _xml += `<${key}>${json[key]}</${key}>`
  });
  return `<xml>${_xml}</xml>`;
}

function strToDate(dateStr) {
  return new Date(dateStr.substr(0, 4), dateStr.substr(4, 2),
    dateStr.substr(6, 2), dateStr.substr(8, 2),
    dateStr.substr(10, 2), dateStr.substr(12, 2));
}
