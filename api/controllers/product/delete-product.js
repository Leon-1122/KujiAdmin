module.exports = {


  friendlyName: 'Delete product',


  description: 'Delete product.',


  inputs: {

    ids: {
      type: ['string'],
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting products have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    await Product.destroy({
      id: {in: inputs.ids}
    });

  }

};
