module.exports = {


  friendlyName: 'View profile editor',


  description: 'Display "Edit profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/profile-editor',
    },

    userNotExist: {
      description: `User not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function () {

    let userInfo = null;

    if (this.req.me) {
      userInfo = await User.findOne({id: this.req.me.id});
    }

    if (!userInfo) {
      throw "userNotExist";
    }

    return {
      pagename: 'profile-editor',
      user: userInfo
    };

  }


};
