module.exports = {


  friendlyName: 'Check stock available',


  description: '',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Check stock success',
    },

    getMachineStockFailed: {
      description: `Get machine stock failed.`,
    }
  },

  fn: async function (inputs) {

    const api = 'get_inventory_list';
    const ObjectId = require('mongodb').ObjectID;
    const db = MachineLottery.getDatastore().manager;
    const id = inputs.lotteryId;
    const lotteryInfo = await MachineLottery.findOne({id: id});

    // 判断库存是否足够，并扣除库存
    const params = {machine_id: lotteryInfo.machineId, shelf_on: 1};
    const response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
      console.log(err);
      return 'getMachineStockFailed';
    });

    if (response.status_code === 0) {
      const productList = lotteryInfo.productList;
      const stockList = response.data;
      let stockEnough = false;

      for (const product of productList) {
        if (product.remain > 0) {
          let cursor = db.collection(MachineLottery.tableName).aggregate(
            [
              {"$unwind": "$productList"},
              {
                "$match": {
                  "machineId": lotteryInfo.machineId,
                  "productList.sku": product.sku,
                  "status": 2,
                  "_id": {$ne: new ObjectId(id)}
                }
              },
              {$group: {_id: "$productList.sku", totalRemain: {$sum: "$productList.remain"}}}
            ], {cursor: {batchSize: 1}});

          let totalInfo = await cursor.next();
          if (!totalInfo) {
            totalInfo = {_id: product.sku, totalRemain: 0};
          }
          for (const stock of stockList) {
            if (stock.sku === product.sku) {
              stockEnough = stock.quantity >= totalInfo.totalRemain + product.remain;
              break;
            }
          }
        } else {
          stockEnough = true;
        }

        if (!stockEnough) {
          return false;
        }
      }

    } else {
      throw 'getMachineStockFailed';
    }

    return true;
  }

};

