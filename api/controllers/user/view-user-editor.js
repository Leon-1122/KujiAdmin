module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',

  inputs: {

    userId: {
      type: 'string',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/user/user-editor',
    },

    userNotExist: {
      description: `User not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var userInfo;

    if (inputs.userId) {
      userInfo = await User.findOne({id: inputs.userId});

      if (!userInfo) {
        throw "userNotExist";
      }
    }

    var roleList = await Role.find();

    return {
      pagename: 'edit-profile',
      roleList: roleList,
      user: userInfo
    };

  }


};
