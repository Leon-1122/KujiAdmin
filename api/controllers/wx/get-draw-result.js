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

    wxUserNotExist: {
      description: `WxUser not exist.`,
      responseType: 'badRequest'
    },

    orderNotExist: {
      description: `Order not exist.`,
      responseType: 'badRequest'
    },

    lotteryNotExist: {
      description: `Lottery not exist.`,
      responseType: 'badRequest'
    },

    reserveOrderFailed: {
      description: `Reserve order failed.`,
      responseType: 'badRequest'
    },

    getMachineStockFailed: {
      description: `Get machine stock failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    if (!this.req.headers.userid) {
      throw "wxUserNotExist";
    }

    const userId = this.req.headers.userid;
    const userInfo = await WxUser.findOne({id: userId});
    if (!userInfo) {
      throw "wxUserNotExist";
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
        drawnList.push(drawItem);

        // 生成日志
        await MachineLog.create({
          machineId: lotteryInfo.machineId,
          lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
          level: drawItem.level,
          productName: drawItem.name,
          num: 1,
          desc: '抽奖取出',
          category: '一番赏',
          operator: userInfo.nickName,
          lottery: lotteryInfo.id,
          wxUser: userId
        });

      } else {
        break
      }
    }

    // 最终赏判断
    if (drawnList.length > 0 && lotteryInfo.cardRemain === inputs.count) {
      let lastIndex = 0;
      productList.map(function (e, i) {
        if (e.last) {
          lastIndex = i;
          lastProduct = {
            name: e.name,
            productImg: e.productImg,
            sku: e.sku,
            level: e.level
          };
        }
      });

      if (lastProduct) {
        productList[lastIndex].remain = 0;
        // 生成日志
        await MachineLog.create({
          machineId: lotteryInfo.machineId,
          lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
          level: lastProduct.level,
          productName: lastProduct.name,
          num: 1,
          desc: '抽奖取出',
          category: '一番赏',
          operator: userInfo.nickName,
          lottery: lotteryInfo.id,
          wxUser: userId
        });
      }
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
      const payTime = orderInfo.payTime ? orderInfo.payTime : Date.now();
      const expireTime = await sails.helpers.formatTimestamp.with({timestamp: payTime + (expireDays - 1) * 24 * 60 * 60 * 1000});
      const chargeTime = await sails.helpers.formatTimestamp.with({timestamp: payTime});
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
      let response = await sails.helpers.ceresonApi.with({api, params}).tolerate('NetworkError');

      let pickCode = '';
      if (response.status_code === 0) {
        if (response.data.success) {
          pickCode = response.data.pick_code;
        } else {
          // 库存不足，关闭该一番赏
          await MachineLottery.updateOne({id: inputs.lotteryId, status: 2}).set({status: 9});
        }
      }

      // 更新订单信息
      await Order.updateOne({id: inputs.orderId}).set({pickCode: pickCode, products: products});

      // 奖品抽完后新开该种一番赏
      if (lotteryInfo.cardRemain === inputs.count) {
        let templateLottery = await Lottery.find({name: lotteryInfo.name, status: {'<': 9}});
        if (templateLottery.length > 0) {
          const template = templateLottery[0];
          let currentTimeTitle = await MachineLottery.getMachineLotteryTimeTitle(lotteryInfo.machineId, lotteryInfo.name);
          let currentOrder = await MachineLottery.getMachineLotteryOrder(lotteryInfo.machineId);
          let newProductList = template.productList.map(function (currentValue) {
            currentValue.remain = currentValue.total;
            return currentValue;
          });

          let valueToSet = {
            machineId: lotteryInfo.machineId,
            name: template.name,
            bannerImg: template.bannerImg,
            status: 1,
            timeTitle: currentTimeTitle + 1,
            order: currentOrder + 1,
            cardRemain: template.cardTotal,
            cardTotal: template.cardTotal,
            price: template.price,
            topImg: template.topImg,
            productList: newProductList,
            productPreview: template.productPreview,
          };

          let newMachineLottery = await MachineLottery.create(valueToSet).intercept('E_UNIQUE', () => {
            return {lotteryDuplicate: {errorMsg: sails.__('The code duplicated.')}}
          }).fetch();

          // 生成日志
          await MachineLog.create({
            machineId: newMachineLottery.machineId,
            lotteryName: `${newMachineLottery.name} 第${newMachineLottery.timeTitle}期`,
            desc: '一番赏生成',
            category: '一番赏',
            operator: '自动',
            lottery: newMachineLottery.id,
          });

          const newLotteryEnough = await sails.helpers.checkStockAvailable.with({lotteryId: newMachineLottery.id})
            .tolerate('getMachineStockFailed');
          if (newLotteryEnough) {
            await MachineLottery.updateOne({id: newMachineLottery.id}).set({status: 2});

            // 生成日志
            await MachineLog.create({
              machineId: newMachineLottery.machineId,
              lotteryName: `${newMachineLottery.name} 第${newMachineLottery.timeTitle}期`,
              desc: '一番赏生效',
              category: '一番赏',
              operator: '自动',
              lottery: newMachineLottery.id,
            });
          }
        }
      } else {
        // 检查当前库存是否满足该一番赏剩下商品余量
        const stockEnough = await sails.helpers.checkStockAvailable.with({lotteryId: inputs.lotteryId})
          .tolerate('getMachineStockFailed');
        if (!stockEnough) {
          // 库存不足，关闭该一番赏
          await MachineLottery.updateOne({id: inputs.lotteryId}).set({status: 9});

          // 生成日志
          await MachineLog.create({
            machineId: lotteryInfo.machineId,
            lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
            desc: '一番赏失效',
            category: '一番赏',
            operator: '自动',
            lottery: lotteryInfo.id,
          });
        }
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
    if (e.remain > 0 && !e.last) {
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
      sku: drawItem.sku,
      level: drawItem.level
    }
  }

  return null
}
