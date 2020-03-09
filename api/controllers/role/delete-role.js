module.exports = {


  friendlyName: 'Delete role',


  description: 'Delete role.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting roles have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    await Role.destroy({
      id: {in: inputs.ids}
    });

  }

};
