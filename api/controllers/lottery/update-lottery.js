module.exports = {


  friendlyName: 'Update lottery',


  description: 'Update lottery.',


  inputs: {

    id: {
      type: 'string',
    },

  },


  exits: {
    success: {
      description: 'The requesting user lottery has been successfully edited.',
    },

    codeDuplicate: {
      statusCode: 409,
      description: 'The name duplicated.',
    },

  },


  fn: async function (inputs) {

    var valuesToSet = {};

    if (inputs.id) {
      await Lottery.updateOne({id: inputs.id}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The name duplicated.')}}
        });

    } else {

      await Lottery.create(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The name duplicated.')}}
        });
    }

  }

};

