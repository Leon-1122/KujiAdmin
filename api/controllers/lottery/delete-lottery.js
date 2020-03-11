module.exports = {


  friendlyName: 'Delete lottery',


  description: 'Delete lottery.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting lotteries have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    await Lottery.destroy({
      id: {in: inputs.ids}
    });

  }

};
