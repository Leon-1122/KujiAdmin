module.exports = {


  friendlyName: 'View user editor',


  description: 'Display "User Editor" page.',

  inputs: {

    id: {
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

    if (inputs.id) {
      userInfo = await User.findOne({id: inputs.id});

      if (!userInfo) {
        throw "userNotExist";
      }
    }

    var roleList = await Role.find();

    return {
      pagename: 'user-editor',
      roleList: roleList,
      user: userInfo
    };

  }


};
