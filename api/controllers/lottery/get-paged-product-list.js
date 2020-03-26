module.exports = {


  friendlyName: 'Get product list',


  description: 'Get product list',

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
      viewTemplatePath: 'partials/app/_common/modals/modal-product/modal-product',
    }

  },


  fn: async function (inputs) {
    var pager = require('../../custom_modules/sails-pager');
    var perPage = 4;
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
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor,
    };
  }

};
