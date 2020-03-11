module.exports = {


  friendlyName: 'View product add',


  description: 'Display "Product add" page.',

  inputs: {},

  exits: {

    success: {
      viewTemplatePath: 'pages/product/product-add',
    },

  },


  fn: async function (inputs) {

    return {
      pagename: 'product-add',
    };

  }


};

