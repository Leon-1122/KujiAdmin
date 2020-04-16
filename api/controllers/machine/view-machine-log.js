module.exports = {


  friendlyName: 'View machine log',


  description: 'Display "Machine log" page.',

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
      viewTemplatePath: 'pages/machine/machine-log',
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
          {'lotteryName': {'contains': inputs.searchFor}},
          {'productName': {'contains': inputs.searchFor}},
          {'desc': {'contains': inputs.searchFor}},
          {'operator': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(MachineLog, criteria, currentPage, perPage, null, 'createdAt DESC');

    return {
      pagename: 'machine-log',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor,
    };
  }


};
