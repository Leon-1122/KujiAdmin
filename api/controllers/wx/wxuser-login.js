module.exports = {


  friendlyName: 'wx user login',


  description: 'wx user login',


  inputs: {

    code: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'Wx user login success.',
    },

    codeDuplicate: {
      statusCode: 409,
      description: 'The openid duplicated.',
    },
  },


  fn: async function (inputs) {
    const axios = require('axios');
    const APPID = sails.config.custom.appid, APPSECRET = sails.config.custom.appsecret;
    let response = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${inputs.code}&grant_type=authorization_code`,
    );

    if (response.data && response.data.errcode === undefined) {
      let wxUser = await WxUser.find({openid: response.data.openid}).limit(1);
      let sessionId = '';

      if (wxUser.length === 0) {
        let valuesToSet = {
          openid: response.data.openid,
          bagList: [],
          moneyBag: 0
        };

        let newWxUser = await WxUser.create(valuesToSet).intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The openid duplicated.')}}
        }).fetch();
        sessionId = newWxUser.id;
      } else {
        sessionId = wxUser[0].id;
      }

      return {
        code: 0,
        data: {
          sessionId
        },
        msg: 'ok',
      };
    } else {
      return {
        code: -1,
        data: response.data,
        msg: 'login failed',
      };
    }
  }

};
