module.exports = {


  friendlyName: 'View role editor',


  description: 'Display "Role editor" page.',

  inputs: {

    id: {
      type: 'string',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/role/role-editor',
    },

    roleNotExist: {
      description: `Role not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var roleInfo;

    if (inputs.id) {
      roleInfo = await Role.findOne({id: inputs.id});

      if (!roleInfo) {
        throw "roleNotExist";
      }
    }

    var moduleList = await Module.find();

    return {
      pagename: 'role-editor',
      moduleList: moduleList,
      role: roleInfo
    };

  }


};
