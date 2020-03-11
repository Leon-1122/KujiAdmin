module.exports = {


  friendlyName: 'View lottery list',


  description: 'Display "Lottery List" page.',

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
      viewTemplatePath: 'pages/lottery/lottery-list',
    }

  },


  fn: async function (inputs) {
    var pager = require('../../custom_modules/sails-pager');
    var perPage = sails.config.custom.dataPerPage;
    var currentPage = 1;
    if (inputs.pageNum) {
      currentPage = inputs.pageNum;
    }

    var criteria = {}, searchFor = '';
    if (inputs.searchFor) {
      criteria = {
        or: [
          {'name': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(Lottery, criteria, currentPage, perPage, null, 'createdAt DESC');
    var lotteryStatusCode = await Code.find({category: 'lotteryStatus'}).sort('order ASC');

    return {
      pagename: 'lottery-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: searchFor,
      lotteryStatusCode: lotteryStatusCode
    };
  }

};
