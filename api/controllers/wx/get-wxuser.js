module.exports = {


  friendlyName: 'get wx user info',


  description: 'get wx user info',


  inputs: {

    userId: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'Get wx user info success.',
    },
  },


  fn: async function (inputs) {

    let userInfo = await WxUser.findOne({id: inputs.userId});

    if (userInfo) {
      delete userInfo.openid;
    } else {
      userInfo = null;
    }

    return ({
      code: 0,
      data: {
        userInfo,
      },
      msg: 'ok',
    });
  }

};
