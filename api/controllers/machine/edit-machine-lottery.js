module.exports = {


  friendlyName: 'Edit machine lottery award',


  description: 'Edit machine lottery award.',


  inputs: {

    lotteryId: {
      type: 'string',
      required: true
    },
    level: {
      type: 'string',
      required: true
    },
    sku: {
      type: 'string',
      required: true
    },
    num: {
      type: 'number',
      required: true
    },
    mode: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'The requesting machine lottery has been successfully edited.',
    },

    productNotExist: {
      responseType: 'badRequest',
      description: 'Product not exist.',
    },

    machineLotteryNotExist: {
      responseType: 'badRequest',
      description: 'Machine lottery not exist.',
    },

    productNotInList: {
      responseType: 'badRequest',
      description: 'Product not in list.',
    },

    machineLotteryInUse: {
      responseType: 'badRequest',
      description: 'Machine lottery in use.',
    },

    getMachineStockFailed: {
      description: `Get machine stock failed.`,
      responseType: 'badRequest'
    },

    stockNotEnough: {
      responseType: 'badRequest',
      description: 'Stock not enough.',
    },

  },


  fn: async function (inputs) {

    const productData = await Product.find({sku: inputs.sku});
    if (productData.length === 0) {
      throw {productNotExist: {errorMsg: sails.__('Product not exist.')}};
    }
    const productInfo = productData[0];

    const lotteryInfo = await MachineLottery.findOne({id: inputs.lotteryId});
    if (!lotteryInfo) {
      throw {machineLotteryNotExist: {errorMsg: sails.__('Machine lottery not exist.')}};
    }
    const productPreview = lotteryInfo.productPreview;
    const productList = lotteryInfo.productList;

    // 减少赏时，判断商品是否在列表中
    if (inputs.mode === 2) {
      let inList = false;
      let decreaseEnough = false;
      for (const product of productList) {
        if (product.level === inputs.level && product.sku === inputs.sku) {
          inList = true;
          if (product.remain >= inputs.num) {
            decreaseEnough = true;
          }
          break;
        }
      }

      if (!inList) {
        throw {productNotInList: {errorMsg: sails.__('Product not in list.')}};
      }

      if (!decreaseEnough) {
        throw {stockNotEnough: {errorMsg: sails.__('Stock not enough.')}};
      }
    }

    const queueList = await Queue.find({
      machineId: lotteryInfo.machineId,
      lotteryId: lotteryInfo.id,
      status: {'<': 3}
    });
    if (queueList.length > 0) {
      throw {machineLotteryInUse: {errorMsg: sails.__('Machine lottery in use.')}};
    }

    let edited = false;
    let levelTotal = 0;
    let newProductList = productList.map(function (product) {
      let newProduct = {
        level: product.level,
        sku: product.sku,
        name: product.name,
        productImg: product.productImg,
        total: product.total,
        remain: product.remain
      };

      if (newProduct.level === inputs.level && newProduct.sku === inputs.sku) {
        newProduct.total = newProduct.total + (inputs.mode === 1 ? inputs.num : inputs.num * -1);
        newProduct.remain = newProduct.remain + (inputs.mode === 1 ? inputs.num : inputs.num * -1);
        edited = true;
      }

      // 计算编辑奖项的商品总数
      if (newProduct.level === inputs.level) {
        levelTotal += newProduct.total;
      }

      // 删除总数为0的奖项
      if (newProduct.total > 0) {
        return newProduct;
      }
    });

    let newProductPreview = productPreview.map(function (productPreviewInfo) {
      if (productPreviewInfo.level !== inputs.level || levelTotal > 0) {
        return {
          level: productPreviewInfo.level,
          name: productPreviewInfo.name,
          productImg: productPreviewInfo.productImg
        };
      }
    });

    // 增加了一个新的奖项
    if (!edited) {
      newProductList.push({
        level: inputs.level,
        sku: inputs.sku,
        name: productInfo.name.zh_CN,
        productImg: productInfo.product_pic[0][0],
        total: inputs.num,
        remain: inputs.num
      });
      newProductList = _.sortByAll(newProductList, ['level', 'sku']);

      let newLevel = true;
      for (const productPreviewInfo of productPreview) {
        if (productPreviewInfo.level === inputs.level) {
          newLevel = false;
          break;
        }
      }

      if (newLevel) {
        newProductPreview.push({
          level: inputs.level,
          name: productInfo.name.zh_CN,
          productImg: productInfo.product_pic[0][0]
        });
      }
      newProductPreview = _.sortByAll(newProductPreview, ['level']);
    }

    await MachineLottery.updateOne({id: lotteryInfo.id}).set({
      cardTotal: lotteryInfo.cardTotal + (inputs.mode === 1 ? inputs.num : inputs.num * -1),
      cardRemain: lotteryInfo.cardRemain + (inputs.mode === 1 ? inputs.num : inputs.num * -1),
      productPreview: newProductPreview,
      productList: newProductList
    });

    const stockEnough = await sails.helpers.checkStockAvailable.with({lotteryId: inputs.lotteryId})
      .tolerate('getMachineStockFailed');

    if (stockEnough) {
      // 生成日志
      await MachineLog.create({
        machineId: lotteryInfo.machineId,
        lotteryName: `${lotteryInfo.name} 第${lotteryInfo.timeTitle}期`,
        level: inputs.level,
        productName: productInfo.name.zh_CN,
        num: inputs.num,
        desc: inputs.mode === 1 ? '增加赏' : '减少赏',
        category: '一番赏',
        operator: this.req.me.fullName,
        lottery: lotteryInfo.id,
        user: this.req.me.id
      });
    } else {
      // 恢复到更新前
      await MachineLottery.updateOne({id: lotteryInfo.id}).set({
        cardTotal: lotteryInfo.cardTotal,
        cardRemain: lotteryInfo.cardRemain,
        productPreview: productPreview,
        productList: productList
      });

      if (stockEnough === undefined) {
        throw {getMachineStockFailed: {errorMsg: sails.__('Get machine stock failed.')}};
      } else {
        throw {stockNotEnough: {errorMsg: sails.__('Stock not enough.')}};
      }

    }


  }
};

