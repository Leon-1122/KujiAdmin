module.exports = {


  friendlyName: 'View machine lottery',


  description: 'Display "Machine lottery" page.',

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
      viewTemplatePath: 'pages/machine/machine-lottery',
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
          {'machineId': {'contains': inputs.searchFor}},
          {'name': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(MachineLottery, criteria, currentPage, perPage, null, [{machineId: 'ASC'}, {order: 'DESC'}]);
    var machineLotteryStatusCode = await Code.find({category: 'machineLotteryStatus'}).sort('order ASC');

    return {
      pagename: 'machine-lottery',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor,
      machineLotteryStatusCode: machineLotteryStatusCode
    };
  }


};
