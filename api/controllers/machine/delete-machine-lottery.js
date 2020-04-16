module.exports = {


  friendlyName: 'Delete machine lottery',


  description: 'Delete machine lottery.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting machine  lotteries have been successfully deleted.',
    },

  },


  fn: async function (inputs) {
    for (const id of inputs.ids) {
      const lotteryInfo = await MachineLottery.findOne({id: id});

      if (lotteryInfo) {
        await MachineLottery.destroyOne({id: id});

        // 生成日志
        await MachineLog.create({
          machineId: lotteryInfo.machineId,
          lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
          desc: '一番赏删除',
          category: '一番赏',
          operator: this.req.me.fullName,
          lottery: lotteryInfo.id,
          user: this.req.me.id,
        });
      }
    }

  }

};
