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

  },


  fn: async function (inputs) {

    for (var i = 0; i < inputs.ids.length; i++) {
      // TODO 判断库存是否足够，并扣除库存
      await MachineLottery.activeMachineLottery(inputs.ids[i]);
    }
  }

};
