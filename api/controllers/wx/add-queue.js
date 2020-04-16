module.exports = {


  friendlyName: 'add queue of specify machine and lottery',


  description: 'add queue of specify machine and lottery',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'add queue success.',
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
    const userInfo = await WxUser.findOne({id: userId});

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

    let currentUserQueueCount = await Queue.count({
        lotteryId: inputs.lotteryId,
        userId: userId,
        status: {'<': 3}
      }
    );

    if (currentUserQueueCount === 0) {
      await Queue.findOrCreate({
          machineId: lotteryInfo.machineId,
          lotteryId: inputs.lotteryId,
          userId: userId,
          status: 1
        },
        {
          machineId: lotteryInfo.machineId,
          lotteryId: inputs.lotteryId,
          userId: userId,
          status: 1
        });
    }

    return ({
      code: 0,
      msg: 'ok',
    });
  }

};
