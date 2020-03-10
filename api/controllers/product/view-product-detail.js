module.exports = {


  friendlyName: 'View product detail',


  description: 'Display "Product detail" page.',

  inputs: {

    id: {
      type: 'string',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/product/product-detail',
    },

    productNotExist: {
      description: `Product not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var productInfo;

    if (inputs.id) {
      productInfo = await Product.findOne({id: inputs.id});

      if (!productInfo) {
        throw "productNotExist";
      }
    }

    return {
      pagename: 'product-detail',
      product: productInfo
    };

  }


};

