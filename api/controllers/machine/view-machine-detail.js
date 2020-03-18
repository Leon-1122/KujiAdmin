module.exports = {


  friendlyName: 'View machine detail',


  description: 'Display "Machine detail" page.',

  inputs: {

    id: {
      type: 'string',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/machine/machine-detail',
    },

    machineNotExist: {
      description: `Machine not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var machineInfo;

    if (inputs.id) {
      machineInfo = await Machine.findOne({id: inputs.id});

      if (!machineInfo) {
        throw "machineNotExist";
      }
    }

    return {
      pagename: 'machine-detail',
      machine: machineInfo
    };

  }


};

