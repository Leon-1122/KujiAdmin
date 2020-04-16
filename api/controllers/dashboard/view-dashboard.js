module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function () {

    let dateFrom = new Date();
    dateFrom.setDate(1);
    dateFrom.setHours(0);
    dateFrom.setMinutes(0);
    dateFrom.setSeconds(0);

    let dateTo = new Date();

    const totalMachineCount = await Machine.count({});
    const totalOnlineMachineCount = await Machine.count({oo_status: 'online'});
    const totalStock = await MachineStock.sum('quantity');
    const totalUserCount = await WxUser.count({});
    const totalSalesNum = await Order.sum('num', {status: 1});
    const monthlySalesAmount = await Order.sum('totalFee', {
      and: [
        {status: 1},
        {payTime: {'>=': dateFrom.getTime()}},
        {payTime: {'<=': dateTo.getTime()}},
      ]
    });
    const totalSalesAmount = await Order.sum('totalFee', {
      status: 1,
      payTime: {'<=': dateTo.getTime()}
    });

    const machineRatio = Math.ceil((totalOnlineMachineCount / totalMachineCount) * 100);
    const stockRatio = Math.ceil((totalStock / (totalMachineCount * 1000)) * 100);

    return {
      pagename: 'dashboard',
      totalOnlineMachineCount,
      totalStock,
      totalUserCount,
      totalSalesNum,
      monthlySalesAmount,
      totalSalesAmount,
      machineRatio,
      stockRatio,
      periodList: [7, 30]
    };

  }


};
