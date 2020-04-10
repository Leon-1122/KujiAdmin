module.exports = {


  friendlyName: 'Reset password',


  description: 'Reset password.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting user password has been successfully reset.',
    },

  },


  fn: async function (inputs) {

    var valuesToSet = {
      password: sails.config.custom.defaultPassword
    };

    await User.updateOne({id: inputs.id}).set(valuesToSet);

  }

};
