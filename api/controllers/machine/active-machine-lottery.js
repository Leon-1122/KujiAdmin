module.exports = {


  friendlyName: 'Active machine lottery',


  description: 'Active machine lottery.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting machine  lotteries have been successfully active.',
    },

    getMachineStockFailed: {
      description: `Get machine stock failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {
    let failedList = [];

    for (const id of inputs.ids) {
      const lotteryInfo = await MachineLottery.findOne({id: id});

      if (lotteryInfo) {
        // 跳过一番赏 2:在售 3:售磐
        if (lotteryInfo.status === 2 || lotteryInfo.status === 3) {
          continue;
        }

        // 判断库存是否足够
        const stockEnough = await sails.helpers.checkStockAvailable.with({lotteryId: id})
          .tolerate('getMachineStockFailed');

        if (stockEnough) {
          await MachineLottery.updateOne({id: id}).set({status: 2});

          // 生成日志
          await MachineLog.create({
            machineId: lotteryInfo.machineId,
            lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
            desc: '一番赏生效',
            category: '一番赏',
            operator: this.req.me.fullName,
            lottery: lotteryInfo.id,
            user: this.req.me.id,
          });
        } else {
          failedList.push({name: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`});
        }
      }
    }

    return {data: {failedList}}
  }

};
