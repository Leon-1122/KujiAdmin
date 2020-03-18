module.exports = {


  friendlyName: 'View machine list',


  description: 'Display "Machine List" page.',

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
      viewTemplatePath: 'pages/machine/machine-list',
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
          {'location': {'contains': inputs.searchFor}},
        ]
      };
    }

    var pagerData = await pager.paginate(Machine, criteria, currentPage, perPage, null, 'createdAt DESC');

    return {
      pagename: 'machine-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor
    };
  }


};
