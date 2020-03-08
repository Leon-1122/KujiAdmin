module.exports = {


  friendlyName: 'Delete user',


  description: 'Delete user.',


  inputs: {

    userIds: {
      type: 'string',
    },

  },


  exits: {
    success: {
      description: 'The requesting users have been successfully deleted.',
    },

  },


  fn: async function (inputs) {

    var ids = [];
    if (inputs.userIds !== undefined) {
      ids = inputs.userIds.split(',');
    }

    await User.destroy({
      id: { in: ids }
    });

  }

};
