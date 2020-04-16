module.exports = {


  friendlyName: 'Disable machine lottery',


  description: 'Disable machine lottery.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting machine lotteries have been successfully disabled.',
    },

  },


  fn: async function (inputs) {

    for (const id of inputs.ids) {
      const lotteryInfo = await MachineLottery.findOne({id: id});

      if (lotteryInfo) {
        // 跳过一番赏 3:售磐 9:失效
        if (lotteryInfo.status === 3 || lotteryInfo.status === 9) {
          continue;
        }

        await MachineLottery.updateOne({id: id}).set({status: 9});

        // 生成日志
        await MachineLog.create({
          machineId: lotteryInfo.machineId,
          lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
          desc: '一番赏失效',
          category: '一番赏',
          operator: this.req.me.fullName,
          lottery: lotteryInfo.id,
          user: this.req.me.id,
        });
      }
    }
  }

};
