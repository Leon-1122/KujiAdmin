module.exports = {


  friendlyName: 'Delete machine',


  description: 'Delete machine.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting machines have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    await Machine.destroy({
      id: {in: inputs.ids}
    });

  }

};
