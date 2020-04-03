module.exports = {


  friendlyName: 'get queues of specify machine and lottery',


  description: 'get queues of specify machine and lottery',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'get queues success.',
    },

    wxuserNotExist: {
      description: `Wxuser not exist.`,
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
      throw "wxuserNotExist";
    }

    const userId = this.req.headers.userid;
    const userInfo = await WxUser.findOne({id: userId});

    if (!userInfo) {
      throw "wxuserNotExist";
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

    let queueCount = 0, inQueue = false, inUse = false;
    let queueList = await Queue.find({
        lotteryId: inputs.lotteryId,
        status: {'<': 3}
      }
    ).sort('createdAt ASC');

    // 检查首位使用中队列是否超时
    const timestamp = Date.now();
    if (queueList.length > 0 && queueList[0].status === 2) {
      const inUseQueue = queueList[0];
      if (timestamp - inUseQueue.updatedAt > 60000) {
        await Queue.updateOne({
            id: inUseQueue.id
          }
        ).set({
          status: 3
        });

        queueList.shift();
      }
    }

    // 无人排队时插入一条排队信息
    if (queueList.length === 0) {
      let newQueue = await Queue.findOrCreate({
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
      queueList.push(newQueue);
    }

    for (const queueInfo of queueList) {
      // 队列首位如果是排队中，则自动更新为使用中
      if (queueCount === 0 && queueInfo.status === 1) {
        await Queue.updateOne({id: queueInfo.id}).set(
          {
            status: 2,
            step: 1
          }
        );
        queueInfo.status = 2;
      }

      if (queueInfo.userId === userId) {
        if (queueInfo.status === 1) {
          inQueue = true;
        } else if (queueInfo.status === 2) {
          inUse = true;
        }
        break;
      }
      queueCount++;
    }


    return ({
      code: 0,
      data: {
        queueCount,
        queueTime: queueCount * 90 / 60,
        inQueue,
        inUse
      },
      msg: 'ok',
    });
  }

};
