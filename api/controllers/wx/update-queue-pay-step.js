module.exports = {


  friendlyName: 'update queue step to paying',


  description: 'update queue step to paying',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'update queue step to paying success.',
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
        status: 2,
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

    // 更新队列状态为完成
    await Queue.update({
        lotteryId: inputs.lotteryId,
        userId: userId,
        status: 2,
      }
    ).set({
      step: 2
    });

    return ({
      code: 0,
      msg: 'ok',
    });
  }

};
