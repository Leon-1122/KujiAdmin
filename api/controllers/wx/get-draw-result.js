module.exports = {


  friendlyName: 'get draw result',


  description: 'get draw result',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },

    count: {
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'Get draw result success.',
    },

    wxuserNotExist: {
      description: `Wxuser not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    if (!this.req.headers.userid) {
      throw "wxuserNotExist";
    }

    const userId = this.req.headers.userid;
    const userInfo = await WxUser.findOne({id: userId});

    if (!userInfo) {
      throw "wxuserNotExist";
    }

    let lastProduct = null, drawnList = [];
    const lotteryInfo = await MachineLottery.findOne({id: inputs.lotteryId});

    if (lotteryInfo) {
      let productList = lotteryInfo.productList;

      // 库存不足
      if (lotteryInfo.cardRemain < inputs.count) {
        return {
          code: -3,
          msg: 'stock not enough'
        }
      }

      // 随机抽取n次
      for (let i = inputs.count; i > 0; i--) {
        let drawItem = draw(productList, i, drawnList);
        if (drawItem) {
          drawnList.push(drawItem)
        } else {
          break
        }
      }

      // 最终赏判断
      if (drawnList.length > 0 && lotteryInfo.cardRemain === inputs.count) {
        let lastIndex = 0;
        productList.map(function (e, i) {
          if (e.level === 'Last One') {
            lastIndex = i;
            lastProduct = {
              name: e.name,
              productImg: e.productImg
            };
          }
        });
        productList[lastIndex].remain = 0;
      }

      const ObjectId = require('mongodb').ObjectID;
      const db = WxUser.getDatastore().manager;

      // 更新奖品剩余数量
      let lotteryWhere = {'_id': new ObjectId(inputs.lotteryId)};
      let lotteryValueToSet = {
        $inc: {'cardRemain': drawnList.length * -1},
        $set: {'updatedAt': Date.now(), 'productList': productList, 'status': (lastProduct ? 3 : 2)}
      };
      let lotteryUpdResult = await db.collection(MachineLottery.tableName).updateOne(lotteryWhere, lotteryValueToSet);

      // 更新用户赏袋信息
      let bagListNew = userInfo.bagList.concat(drawnList);
      if (lastProduct) {
        bagListNew.push(lastProduct)
      }
      let userWhere = {'_id': new ObjectId(userId)};
      let userValueToSet = {
        $set: {'updatedAt': Date.now(), 'bagList': bagListNew}
      };
      let userUpdResult = await db.collection(WxUser.tableName).updateOne(userWhere, userValueToSet);

      if (lotteryUpdResult.result.nModified && userUpdResult.result.nModified) {
        return ({
          code: 0,
          data: {
            drawnList,
            lastProduct
          },
          msg: 'ok',
        });
      } else {
        return {
          code: -4,
          msg: 'update failed'
        }
      }
    } else {
      return {
        code: -5,
        msg: 'lottery not exist'
      }
    }
  }

};

function draw(productList) {
  let index = 0,
    indexList = [];
  productList.map(function (e, i) {
    if (e.remain > 0 && e.level !== 'Last One') {
      indexList[index] = i;
      index++;
    }
  });

  if (indexList.length > 0) {
    let drawNo = parseInt(Math.random() * indexList.length, 10);
    productList[indexList[drawNo]].remain = productList[indexList[drawNo]].remain - 1;
    let drawItem = productList[indexList[drawNo]];
    return {
      name: drawItem.name,
      productImg: drawItem.productImg
    }
  }

  return null
}
