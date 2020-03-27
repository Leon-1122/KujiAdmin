module.exports = {


  friendlyName: 'Add machine lottery',


  description: 'Add machine lottery.',


  inputs: {

    machineId: {
      type: 'string',
      required: true
    },

    lotteryId: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'The requesting machine lottery has been successfully added.',
    },

    machineNotExist: {
      description: `Machine not exist.`,
      responseType: 'badRequest'
    },

    lotteryNotExist: {
      description: `Lottery not exist.`,
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs) {
    var machineInfo = await Machine.findOne({id: inputs.machineId});
    if (!machineInfo) {
      throw "machineNotExist";
    }

    var lotteryInfo = await Lottery.findOne({id: inputs.lotteryId});
    if (!lotteryInfo) {
      throw "lotteryNotExist";
    }

    var timestamp = Date.now();
    var currentTimeTitle = await MachineLottery.getMachineLotteryTimeTitle(machineInfo.machine_id, lotteryInfo.name);
    var currentOrder = await MachineLottery.getMachineLotteryOrder(machineInfo.machine_id);

    var mainData = {
      bannerImg: lotteryInfo.bannerImg,
      canTap: true,
      comingSoon: true,
      machineCode: machineInfo.machine_id,
      name: lotteryInfo.name,
      soldOut: false,
      timeTitle: currentTimeTitle + 1,
      order: currentOrder + 1,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    var productList = lotteryInfo.productList.map(function (currentValue, index, arr) {
      currentValue.remain = currentValue.total;
      return currentValue;
    });
    var detailData = {
      cardRemain: lotteryInfo.cardTotal,
      cardTotal: lotteryInfo.cardTotal,
      machineCode: machineInfo.machine_id,
      openStatus: false,
      price: lotteryInfo.price,
      topImg: lotteryInfo.topImg,
      productList: productList,
      productPreview: lotteryInfo.productPreview,
      order: currentOrder + 1,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await MachineLottery.addMachineLottery(mainData, detailData);
  }

};
