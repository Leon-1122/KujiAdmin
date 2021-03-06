module.exports = {


  friendlyName: 'Delete user',


  description: 'Delete user.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting users have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    await User.destroy({
      id: {in: inputs.ids}
    });

  }

};
