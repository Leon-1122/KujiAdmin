module.exports = {


  friendlyName: 'get draw result',


  description: 'get draw result',


  inputs: {
    lotteryId: {
      type: 'string',
      required: true
    },

    orderId: {
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
    },

    orderNotExist: {
      description: `Order not exist.`,
      responseType: 'badRequest'
    },

    lotteryNotExist: {
      description: `Lottery not exist.`,
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

    const orderInfo = await Order.findOne({id: inputs.orderId});
    if (!orderInfo) {
      throw "orderNotExist";
    }

    const lotteryInfo = await MachineLottery.findOne({id: inputs.lotteryId});
    if (!lotteryInfo) {
      throw "lotteryNotExist";
    }

    // 库存不足
    if (lotteryInfo.cardRemain < inputs.count) {
      return {
        code: -3,
        msg: 'stock not enough'
      }
    }

    // 更新队列状态为支付完成
    await Queue.update({
        lotteryId: inputs.lotteryId,
        userId: userId,
        status: 2,
      }
    ).set({
      status: 3,
      step: 3
    });

    let lastProduct = null, drawnList = [];
    let productList = lotteryInfo.productList;

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
            productImg: e.productImg,
            sku: e.sku
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
    let products = drawnList;
    if (lastProduct) {
      bagListNew.push(lastProduct);
      products.push(lastProduct);
    }
    let userWhere = {'_id': new ObjectId(userId)};
    let userValueToSet = {
      $set: {'updatedAt': Date.now(), 'bagList': bagListNew}
    };
    let userUpdResult = await db.collection(WxUser.tableName).updateOne(userWhere, userValueToSet);

    if (lotteryUpdResult.result.nModified && userUpdResult.result.nModified) {
      // 售货机预定商品
      const api = 'reserve_order';
      const expireDays = sails.config.custom.reserve_order_expire_days ? sails.config.custom.reserve_order_expire_days : 3;
      const notifyUrl = sails.config.custom.baseUrl + '/api/v1/wx/reserveOrderNotify';
      const expireTime = await sails.helpers.formatTimestamp.with({timestamp: orderInfo.payTime + (expireDays - 1) * 24 * 60 * 60 * 1000});
      const chargeTime = await sails.helpers.formatTimestamp.with({timestamp: orderInfo.payTime});
      const price = lotteryInfo.price;

      let orderDetail = {};
      products.forEach(function (product) {
        if (orderDetail.hasOwnProperty(product.sku)) {
          let quantity = orderDetail[product.sku].quantity + 1;
          let chargeAmount = orderDetail[product.sku].charge_amount + price * 100;
          orderDetail[product.sku] = {
            quantity: quantity,
            item_price: price * 100,
            discount_amount: 0,
            charge_amount: chargeAmount,
            type: 'sale'
          }
        } else {
          orderDetail[product.sku] = {
            quantity: 1,
            item_price: price * 100,
            discount_amount: 0,
            charge_amount: price * 100,
            type: 'sale'
          }
        }
      });

      let params = {
        kiosk_id: lotteryInfo.machineId,
        order_no: orderInfo.orderNo,
        payment_method: 'wechat',
        expire_time: expireTime.substring(0, 10) + ' 23:59:59',
        charge_time: chargeTime.substring(0, 10) + ' 00:00:00',
        notify_url: notifyUrl,
        order_detail: orderDetail,
      };
      let response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
        console.log(err);
        return 'reserveOrderFailed';
      });

      let pickCode = '';
      if (response.status_code === 0) {
        if (response.data.success) {
          pickCode = response.data.pick_code;
        } else {
          // 库存不足，关闭该一番赏
          await MachineLottery.updateOne({id: inputs.lotteryId}).set({status: 9});
        }
      }

      // 更新订单信息
      await Order.updateOne({id: inputs.orderId}).set({pickCode: pickCode, products: products});

      // TODO 奖品抽完后新开该种一番赏
      if (lastProduct) {

      }

      return ({
        code: 0,
        data: {
          drawnList,
          lastProduct,
          pickCode
        },
        msg: 'ok',
      });

    } else {
      return {
        code: -2,
        msg: 'update failed'
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
      productImg: drawItem.productImg,
      sku: drawItem.sku
    }
  }

  return null
}
