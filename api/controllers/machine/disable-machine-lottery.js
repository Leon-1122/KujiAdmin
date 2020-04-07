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
    let valueToSet = {status: 9};
    await MachineLottery.update({
      id: {in: inputs.ids}
    }).set(valueToSet);

  }

};
