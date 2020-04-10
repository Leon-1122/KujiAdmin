module.exports = {


  friendlyName: 'get sales breakdown',


  description: 'get sales breakdown',


  inputs: {
    period: {
      type: 'number',
    },
  },


  exits: {
    success: {
      description: 'get sales breakdown success.',
    },
  },


  fn: async function (inputs) {

    const db = Order.getDatastore().manager;

    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - (inputs.period ? inputs.period : 7));
    dateFrom.setHours(0);
    dateFrom.setMinutes(0);
    dateFrom.setSeconds(0);

    let dateTo = new Date();

    let cursor = db.collection(Order.tableName).aggregate([
        {
          $match: {
            $and: [
              {payTime: {$gte: dateFrom.getTime()}},
              {payTime: {$lte: dateTo.getTime()}},
            ]
          }
        },
        {
          $group: {
            _id: "$machineId",
            sales: {$sum: "$totalFee"}
          }
        },
        {$sort: {_id: 1}},
      ]
    );

    let result = [];
    let totalInfo = await cursor.next();
    while (totalInfo) {
      result.push({label: totalInfo._id, value: totalInfo.sales});
      totalInfo = await cursor.next();
    }
    return ({
      code: 0,
      data: {
        salesBreakdown: result,
      },
      msg: 'ok',
    });
  }

}
;
