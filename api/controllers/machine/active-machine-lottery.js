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
    // TODO 判断库存是否足够，并扣除库存
    let valueToSet = {status: 2};
    await MachineLottery.update({
      id: {in: inputs.ids}
    }).set(valueToSet);

  }

};
