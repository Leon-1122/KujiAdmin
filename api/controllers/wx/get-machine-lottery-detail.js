module.exports = {


  friendlyName: 'get project detail',


  description: 'get project detail',


  inputs: {

    machineId: {
      type: 'string'
    },

    id: {
      type: 'string'
    },

    order: {
      type: 'number'
    },
  },


  exits: {
    success: {
      description: 'Get project detail success.',
    },
  },


  fn: async function (inputs) {

    return ({
      code: 0,
      data: {},
      msg: 'ok',
    });
  }

};
