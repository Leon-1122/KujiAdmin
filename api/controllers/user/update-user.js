module.exports = {


  friendlyName: 'Update user',


  description: 'Update user.',


  inputs: {

    id: {
      type: 'string',
    },

    accountName: {
      type: 'string',
      required: true
    },

    emailAddress: {
      type: 'string',
      required: true
    },

    fullName: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'The requesting user has been successfully edited.',
    },

    accountNameOrEmailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided account name or email address is already in use.',
    },

  },


  fn: async function (inputs) {

    var valuesToSet = {
      accountName: inputs.accountName.toLowerCase(),
      emailAddress: inputs.emailAddress.toLowerCase(),
      fullName: inputs.fullName,
      role: inputs.role
    };

    if (inputs.id) {
      await User.updateOne({id: inputs.id}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {accountNameOrEmailAlreadyInUse: {errorMsg: sails.__('The provided email address is already in use.')}}
        });

    } else {
      _.extend(valuesToSet, {
        password: sails.config.custom.defaultPassword
      });

      await User.create(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {accountNameOrEmailAlreadyInUse: {errorMsg: sails.__('The provided account name or email address is already in use.')}}
        });
    }

  }

};
