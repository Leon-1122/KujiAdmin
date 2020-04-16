module.exports = {


  friendlyName: 'View user list',


  description: 'Display "User List" page.',

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
      viewTemplatePath: 'pages/user/user-list',
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
          {accountName: {'contains': inputs.searchFor}},
          {emailAddress: {'contains': inputs.searchFor}},
          {fullName: {'contains': inputs.searchFor}}
        ]
      }
    }
    var pagerData = await pager.paginate(User, criteria, currentPage, perPage, [{name: 'role'}], 'createdAt');

    return {
      pagename: 'user-list',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor
    };

  }


};
