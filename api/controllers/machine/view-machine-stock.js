module.exports = {


  friendlyName: 'View machine stock',


  description: 'Display "Machine stock" page.',

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
      viewTemplatePath: 'pages/machine/machine-stock',
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
          {'machine_id': {'contains': inputs.searchFor}},
          {'sku': {'contains': inputs.searchFor}},
          {'name': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(MachineStock, criteria, currentPage, perPage, null, [{machine_id: 'ASC'}, {sku: 'ASC'}]);

    return {
      pagename: 'machine-stock',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor
    };
  }


};
