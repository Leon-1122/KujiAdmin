module.exports = {


  friendlyName: 'update wx user',


  description: 'update wx user',


  inputs: {
    userInfo: {
      type: 'json',
      required: true
    },

  },


  exits: {
    success: {
      description: 'Wx user update success.',
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

    userInfo = await WxUser.updateOne({id: userId}).set(inputs.userInfo);

    delete userInfo.openid;

    return ({
      code: 0,
      data: {
        userInfo,
      },
      msg: 'ok',
    });
  }

};
