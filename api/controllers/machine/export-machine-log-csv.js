module.exports = {


  friendlyName: 'Export machine log csv',


  description: 'Export machine log csv.',

  inputs: {

    searchFor: {
      type: 'string',
    },

  },

  exits: {

    success: {}

  },


  fn: async function (inputs) {

    let criteria = {};
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

    const machineLogList = await MachineLog.find({
      select: ['machineId', 'lotteryName', 'level', 'productName', 'num', 'category', 'desc', 'operator', 'createdAt'],
      where: criteria,
      sort: 'createdAt DESC'
    });

    const editedMachineLogList = machineLogList.map(function (machineLog) {
      machineLog.createdAt = formatTimestamp(machineLog.createdAt);
      return machineLog;
    });

    const {parse} = require('json2csv');
    const fields = ['machineId', 'lotteryName', 'level', 'productName', 'num', 'category', 'desc', 'operator', 'createdAt'];
    const opts = {fields};
    // UTF-8格式文件添加BOM头解决excel打开乱码
    const csv = '\ufeff' + parse(editedMachineLogList, opts);
    this.res.set('Content-Type', 'text/csv;');
    this.res.attachment(`machine_log_${Date.now()}.csv`);
    return this.res.send(csv);
  }

};

function formatTimestamp(timestamp) {
  var date = new Date(timestamp + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ');
}
