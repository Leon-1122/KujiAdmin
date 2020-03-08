module.exports = {


  friendlyName: 'Login',


  description: 'Log in using the provided email and password combination.',


  inputs: {

    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    },

    remember: {
      description: 'Whether to extend the lifetime of the user\'s session.',
      type: 'string'
    }

  },

  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function (inputs) {

    var userRecord = await User.findOne({
      emailAddress: inputs.emailAddress.toLowerCase(),
    });

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!userRecord) {
      throw {badCombo: {errorMsg: sails.__('The provided email and password combination does not match any user.')}};
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
      .intercept('incorrect',
        () => {
          return {badCombo: {errorMsg: sails.__('The provided email and password combination does not match any user.')}}
        });

    // If "Remember Me" was enabled, then keep the session alive for
    // a longer amount of time.  (This causes an updated "Set Cookie"
    // response header to be sent as the result of this request -- thus
    // we must be dealing with a traditional HTTP request in order for
    // this to work.)
    if (inputs.remember) {
      if (this.req.isSocket) {
        sails.log.warn(
          'Received `rememberMe: true` from a virtual request, but it was ignored\n' +
          'because a browser\'s session cookie cannot be reset over sockets.\n' +
          'Please use a traditional HTTP request instead.'
        );
      } else {
        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
      }
    }

    // Modify the active session instance.
    // (This will be persisted when the response is sent.)
    this.req.session.userId = userRecord.id;

  }

};
