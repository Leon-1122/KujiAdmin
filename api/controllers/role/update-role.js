module.exports = {


  friendlyName: 'Update role',


  description: 'Update role.',


  inputs: {

    id: {
      type: 'string',
    },

    code: {
      type: 'string',
      required: true
    },

    desc: {
      type: 'string',
      required: true
    },

    modules: {
      type: 'json',
    },

  },


  exits: {
    success: {
      description: 'The requesting user role has been successfully edited.',
    },

    codeDuplicate: {
      statusCode: 409,
      description: 'The code duplicated.',
    },

  },


  fn: async function (inputs) {

    var modules = [];
    if (inputs.modules) {
      modules = _([]).concat(inputs.modules).value();
    }

    var valuesToSet = {
      code: inputs.code.toUpperCase(),
      desc: inputs.desc,
      modules: modules
    };

    if (inputs.id) {
      await Role.updateOne({id: inputs.id}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The code duplicated.')}}
        });

    } else {

      await Role.create(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The code duplicated.')}}
        });
    }

  }

}
;
