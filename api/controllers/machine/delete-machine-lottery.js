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
    await MachineLottery.destroy({
      id: {in: inputs.ids}
    });

  }

};
