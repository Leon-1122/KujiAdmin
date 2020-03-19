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

    var perPage = sails.config.custom.dataPerPage;
    var currentPage = 1;
    if (inputs.pageNum) {
      currentPage = inputs.pageNum;
    }

    var where;
    if (inputs.searchFor) {
      where = `db.command.or([{machineCode: /${inputs.searchFor}/i},{name: /${inputs.searchFor}/i}])`;
    }
    var orderBy = [{fieldName: 'machineCode', order: 'asc'}, {fieldName: 'order', order: 'asc'}];
    var pagerData = await MachineLottery.findPagedList(where, perPage, (currentPage - 1) * perPage, orderBy);

    return {
      pagename: 'machine-lottery',
      items: pagerData.data,
      pager: pagerData.meta,
      searchFor: inputs.searchFor
    };
  }


};
