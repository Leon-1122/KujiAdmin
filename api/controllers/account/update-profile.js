module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    fullName: {
      type: 'string',
      required: true
    },

    emailAddress: {
      type: 'string',
      required: true
    },

  },


  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    let valuesToSet = {
      emailAddress: inputs.emailAddress.toLowerCase(),
      fullName: inputs.fullName,
    };

    if (this.req.me) {
      await User.updateOne({id: this.req.me.id}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {emailAlreadyInUse: {errorMsg: sails.__('The provided email address is already in use.')}}
        });
    }

  }


};
