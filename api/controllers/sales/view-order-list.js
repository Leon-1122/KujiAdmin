module.exports = {


  friendlyName: 'View order list',


  description: 'Display "Order List" page.',

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
      viewTemplatePath: 'pages/sales/order-list',
    }

  },


  fn: async function (inputs) {
    var pager = require('../../custom_modules/sails-pager');
    var perPage = sails.config.custom.dataPerPage;
    var currentPage = 1;
    if (inputs.pageNum) {
      currentPage = inputs.pageNum;
    }

    var criteria = {};
    if (inputs.searchFor) {
      criteria = {
        or: [
          {'title': {'contains': inputs.searchFor}},
          {'machineId': {'contains': inputs.searchFor}},
          {'orderNo': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(Order, criteria, currentPage, perPage, null, 'createdAt DESC');
    var orderStatusCode = await Code.find({category: 'orderStatus'}).sort('order ASC');

    return {
      pagename: 'order-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor,
      orderStatusCode: orderStatusCode
    };
  }


};
