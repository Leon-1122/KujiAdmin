module.exports = {


  friendlyName: 'Get machine sales',


  description: 'Get machine sales',

  inputs: {

    pageNum: {
      type: 'number',
    },

    period: {
      type: 'number',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'partials/app/dashboard/items/items',
    }

  },


  fn: async function (inputs) {

    const db = Order.getDatastore().manager;

    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - (inputs.period ? inputs.period : 7));
    dateFrom.setHours(0);
    dateFrom.setMinutes(0);
    dateFrom.setSeconds(0);

    let dateTo = new Date();

    let countCursor = db.collection(Order.tableName).aggregate([
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
            count: {$sum: 1}
          }
        },
        {
          $group: {
            _id: null,
            count: {$sum: 1}
          }
        },
      ]
    );

    let totalCount = 0;
    let countInfo = await countCursor.next();
    if (countInfo) {
      totalCount = countInfo.count;
    }

    const perPage = 5;
    let totalPage = Math.ceil(totalCount / perPage);
    let currentPage = 1;
    if (inputs.pageNum === 0 || inputs.pageNum) {
      currentPage = inputs.pageNum <= 0 ? totalPage : (inputs.pageNum > totalPage ? 1 : inputs.pageNum);
    }

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
            sales: {$sum: "$totalFee"},
            num: {$sum: "$num"}
          }
        },
        {$sort: {_id: 1}},
        {$skip: (currentPage - 1) * perPage},
        {$limit: perPage},
      ]
    );

    let items = [];
    let totalInfo = await cursor.next();
    while (totalInfo) {
      // 根据机器ID获取日销售数据
      let dailySalesCursor = db.collection(Order.tableName).aggregate([
          {
            $match: {
              $and: [
                {payTime: {$gte: dateFrom.getTime()}},
                {payTime: {$lte: dateTo.getTime()}},
                {machineId: totalInfo._id,}
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

      let dailySalesMap = {};
      let dailySalesInfo = await dailySalesCursor.next();
      while (dailySalesInfo) {
        dailySalesMap[dailySalesInfo._id.payDate] = dailySalesInfo.sales;
        dailySalesInfo = await dailySalesCursor.next();
      }

      let tendency = '';
      for (let date = new Date(dateFrom.getTime()); date <= dateTo; date.setDate(date.getDate() + 1)) {
        let formattedDate = await sails.helpers.formatTimestamp.with({timestamp: date.getTime()});
        formattedDate = formattedDate.substr(0, 10);
        if (dailySalesMap.hasOwnProperty(formattedDate)) {
          tendency += `${dailySalesMap[formattedDate]},`;
        } else {
          tendency += `0,`;
        }
      }

      if (tendency.length > 0) {
        tendency = tendency.substr(0, tendency.length - 1);
      }
      items.push({machineId: totalInfo._id, sales: totalInfo.sales, num: totalInfo.num, tendency: tendency});
      totalInfo = await cursor.next();
    }

    return {
      items: items,
      currentPage: currentPage,
    };
  }

};
