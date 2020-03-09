module.exports = {


  friendlyName: 'View role list',


  description: 'Display "Role List" page.',

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
      viewTemplatePath: 'pages/role/role-list',
    }

  },


  fn: async function (inputs) {
    var pager = require('sails-pager');
    var perPage = sails.config.custom.dataPerPage;
    var currentPage = 1;
    if (inputs.pageNum) {
      currentPage = inputs.pageNum;
    }

    var criteria = {};
    var searchFor = '';
    if (inputs.searchFor) {
      searchFor = inputs.searchFor;
      criteria = {
        or: [
          {code: {'contains': inputs.searchFor}},
          {desc: {'contains': inputs.searchFor}}
        ]
      }
    }
    var pagerData = await pager.paginate(Role, criteria, currentPage, perPage, null, 'createdAt');

    return {
      pagename: 'role-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: searchFor
    };

  }


};
