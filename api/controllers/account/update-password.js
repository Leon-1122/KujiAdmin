module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    oldPassword: {
      type: 'string',
      required: true
    },

    newPassword: {
      type: 'string',
      required: true
    },

    confirmPassword: {
      type: 'string',
      required: true
    },
  },

  exits: {

    newPasswordInvalid: {
      statusCode: 409,
      description: 'The new password is invalid.',
    },

    confirmPasswordNotSame: {
      statusCode: 409,
      description: 'The confirm password is not same as new password.',
    },

    oldPasswordIncorrect: {
      statusCode: 409,
      description: 'The old password is incorrect.',
    },

  },

  fn: async function (inputs) {

    // 密码只能包含大小写字母、数字、下划线、减号，且至少6位
    const pattern = /^[\w_-]{6,}$/;
    if (!pattern.test(inputs.newPassword)) {
      throw {newPasswordInvalid: {errorMsg: sails.__('The new password is invalid.')}};
    }
    if (inputs.newPassword !== inputs.confirmPassword) {
      throw {confirmPasswordNotSame: {errorMsg: sails.__('The confirm password is not same as new password.')}};
    }

    const userRecord = await User.findOne({id: this.req.me.id});
    await sails.helpers.passwords.checkPassword(inputs.oldPassword, userRecord.password)
      .intercept('incorrect',
        () => {
          return {oldPasswordIncorrect: {errorMsg: sails.__('The old password is incorrect.')}}
        });

    const hashed = await sails.helpers.passwords.hashPassword(inputs.newPassword);

    await User.updateOne({id: this.req.me.id})
      .set({
        password: hashed
      });

  }


};
