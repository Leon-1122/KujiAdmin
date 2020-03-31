module.exports = {


  friendlyName: 'money bag pay',


  description: 'money bag pay',


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
      description: 'Money bag pay success.',
    },

    wxuserNotExist: {
      description: `Wxuser not exist.`,
      responseType: 'badRequest'
    },

    machineNotExist: {
      description: `Machine not exist.`,
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

    // TODO 检测排他状态

    // 获取一番赏信息
    const lotteryInfo = await MachineLottery.findOne({id: inputs.lotteryId});
    const machineInfo = await Machine.find({machine_id: lotteryInfo.machineId});

    if (machineInfo.length === 0) {
      throw "machineNotExist";
    }

    const machineId = machineInfo[0].id;
    const payment = lotteryInfo.price * inputs.num;

    const ObjectId = require('mongodb').ObjectID;
    const db = WxUser.getDatastore().manager;
    let where = {'_id': new ObjectId(userId)};
    let valueToSet = {$inc: {'moneyBag': payment * -1}, $set: {'updatedAt': Date.now()}};
    let result = await db.collection(WxUser.tableName).updateOne(where, valueToSet);

    if (result.result.nModified) {
      // 订单数据插入到数据库
      const orderNo = Date.parse(new Date()) + Math.round(1e3 * Math.random())
      let orderInfo = {
        orderNo: orderNo,
        buyerNick: userInfo.nickName,
        machineId: lotteryInfo.machineId,
        wxUser: userId,
        machine: machineId,
        lottery: inputs.lotteryId,
        status: 1,
        title: `一番赏 ${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
        price: lotteryInfo.price,
        num: inputs.num,
        totalFee: payment,
        payTime: Date.now()
      };
      await Order.create(orderInfo);

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
