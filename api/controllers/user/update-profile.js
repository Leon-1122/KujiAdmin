module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for user.',


  inputs: {

    userId: {
      type: 'string',
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
      description: 'The requesting user profile has been successfully edited.',
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    var valuesToSet = {
      emailAddress: inputs.emailAddress.toLowerCase(),
      fullName: inputs.fullName,
      role: inputs.role
    };

    if (inputs.userId) {
      await User.updateOne({id: inputs.userId}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {emailAlreadyInUse: {errorMsg: sails.__('The provided email address is already in use.')}}
        });

    } else {
      _.extend(valuesToSet, {
        password: sails.config.custom.defaultPassword
      });

      await User.create(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {emailAlreadyInUse: {errorMsg: sails.__('The provided email address is already in use.')}}
        });
    }

  }

};
