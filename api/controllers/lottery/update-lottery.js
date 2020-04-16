module.exports = {


  friendlyName: 'Update lottery',


  description: 'Update lottery.',


  inputs: {

    id: {
      type: 'string',
    },
    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    cardTotal: {
      type: 'number',
      required: true
    },
    bannerImg: {
      type: 'string',
      required: true
    },
    topImg: {
      type: 'string',
      required: true
    },
    productPreview: {
      type: 'json',
      required: true
    },
    productList: {
      type: 'json',
      required: true
    },
  },


  exits: {
    success: {
      description: 'The requesting user lottery has been successfully edited.',
    },

    codeDuplicate: {
      statusCode: 409,
      description: 'The name duplicated.',
    },

  },


  fn: async function (inputs) {

    var productPreview = _.sortByAll(JSON.parse(inputs.productPreview), ['last', 'level']);
    var productList = _.sortByAll(JSON.parse(inputs.productList), ['last', 'level', 'sku']);

    var valuesToSet = {
      name: inputs.name,
      price: inputs.price,
      cardTotal: inputs.cardTotal,
      bannerImg: inputs.bannerImg,
      topImg: inputs.topImg,
      productPreview: productPreview,
      productList: productList,
    };

    if (inputs.id) {
      await Lottery.updateOne({id: inputs.id}).set(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The name duplicated.')}}
        });

    } else {

      await Lottery.create(valuesToSet)
        .intercept('E_UNIQUE', () => {
          return {codeDuplicate: {errorMsg: sails.__('The name duplicated.')}}
        });
    }

  }

};

