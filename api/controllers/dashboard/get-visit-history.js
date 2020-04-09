module.exports = {


  friendlyName: 'get visit history',


  description: 'get visit history',


  inputs: {},


  exits: {
    success: {
      description: 'get visit history success.',
    },
  },


  fn: async function (inputs) {

    const db = VisitHistory.getDatastore().manager;

    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);
    dateFrom.setHours(0);
    dateFrom.setMinutes(0);
    dateFrom.setSeconds(0);

    let dateTo = new Date();

    let cursor = db.collection(VisitHistory.tableName).aggregate([
        {
          $match: {
            $and: [
              {createdAt: {$gte: dateFrom.getTime()}},
              {createdAt: {$lte: dateTo.getTime()}},
            ]
          }
        },
        {
          $group: {
            _id: {
              "visitDate": "$visitDate",
              "machineId": "$machineId",
              "userId": "$userId",
            },
            count: {$sum: 1}
          }
        },
        {
          $group: {
            _id: {
              "visitDate": "$_id.visitDate",
            },
            distinctCount: {$sum: 1}
          }
        },
        {$sort: {_id: 1}},
      ]
    );

    let result = [];
    let totalInfo = await cursor.next();
    while (totalInfo) {
      result.push({date: totalInfo._id.visitDate, count: totalInfo.distinctCount});
      totalInfo = await cursor.next();
    }
    return ({
      code: 0,
      data: {
        viewHistory: result,
      },
      msg: 'ok',
    });
  }

}
;
