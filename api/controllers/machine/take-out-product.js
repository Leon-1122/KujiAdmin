module.exports = {


  friendlyName: 'Take out product',


  description: 'Take out product.',


  inputs: {

    machineId: {
      type: 'string',
      required: true
    },

    items: {
      type: 'ref',
      required: true
    },
  },


  exits: {
    success: {
      description: 'The requesting products have been successfully taken out.',
    },
  },


  fn: async function (inputs) {
    // TODO 远程取出商品
    sails.log(inputs);
  }

};
