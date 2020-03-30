module.exports = {


  friendlyName: 'money bag pay',


  description: 'money bag pay',


  inputs: {
    payment: {
      type: 'number',
      required: true
    },

  },


  exits: {
    success: {
      description: 'Money bag pay success.',
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

    const ObjectId = require('mongodb').ObjectID;
    const db = WxUser.getDatastore().manager;
    let where = {'_id': new ObjectId(userId)};
    let valueToSet = {$inc: {'moneyBag': inputs.payment * -1}, $set: {'updatedAt': Date.now()}};
    let result = await db.collection(WxUser.tableName).updateOne(where, valueToSet);

    if (result.result.nModified) {
      // TODO 生成订单

      return ({
        code: 0,
        msg: 'ok',
      });
    } else {
      return ({
        code: -2,
        msg: 'money bag update failed',
      });
    }

  }

};
