module.exports = {


  friendlyName: 'View product list',


  description: 'Display "Product List" page.',

  inputs: {

    searchFor: {
      type: 'string',
    },

    pageNum: {
      type: 'number',
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/product/product-list',
    }

  },


  fn: async function (inputs) {
    var pager = require('../../custom_modules/sails-pager');
    var perPage = sails.config.custom.dataPerPage;
    var currentPage = 1;
    if (inputs.pageNum) {
      currentPage = inputs.pageNum;
    }


    var criteria = {}, meta = {}, searchFor = '';
    if (inputs.searchFor) {
      criteria = {
        or: [
          {'name.zh_CN': {'contains': inputs.searchFor}},
        ]
      };
      meta = {enableExperimentalDeepTargets: true}
    }

    var pagerData = await pager.paginate(Product, criteria, currentPage, perPage, null, 'createdAt DESC', meta);

    return {
      pagename: 'product-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: searchFor
    };
  }


};
