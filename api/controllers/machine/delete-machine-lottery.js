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

    for (var i = 0; i < inputs.ids.length; i++) {
      // TODO 返回占用库存
      await MachineLottery.deleteMachineLottery(inputs.ids[i]);
    }
  }

};
