module.exports = {


  friendlyName: 'get sales history',


  description: 'get sales history',


  inputs: {},


  exits: {
    success: {
      description: 'get sales history success.',
    },
  },


  fn: async function (inputs) {

    const db = Order.getDatastore().manager;

    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);
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
            _id: {
              "payDate": {$dateToString: {format: "%Y-%m-%d", date: {$toDate: "$payTime"}}},
            },
            sales: {$sum: "$totalFee"}
          }
        },
        {$sort: {_id: 1}},
      ]
    );

    let result = [];
    let totalInfo = await cursor.next();
    while (totalInfo) {
      result.push({date: totalInfo._id.payDate, sales: totalInfo.sales});
      totalInfo = await cursor.next();
    }
    return ({
      code: 0,
      data: {
        salesHistory: result,
      },
      msg: 'ok',
    });
  }

}
;
