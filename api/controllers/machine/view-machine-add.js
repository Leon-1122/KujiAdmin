module.exports = {


  friendlyName: 'View machine add',


  description: 'Display "Machine add" page.',

  inputs: {},

  exits: {

    success: {
      viewTemplatePath: 'pages/machine/machine-add',
    },

  },


  fn: async function (inputs) {

    return {
      pagename: 'machine-add',
    };

  }


};

