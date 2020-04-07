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

    lotteryDuplicate: {
      statusCode: 409,
      description: 'The lottery duplicated.',
    },
  },


  fn: async function (inputs) {
    let machineInfo = await Machine.findOne({id: inputs.machineId});
    if (!machineInfo) {
      throw "machineNotExist";
    }

    let lotteryInfo = await Lottery.findOne({id: inputs.lotteryId});
    if (!lotteryInfo) {
      throw "lotteryNotExist";
    }

    let currentTimeTitle = await MachineLottery.getMachineLotteryTimeTitle(machineInfo.machine_id, lotteryInfo.name);
    let currentOrder = await MachineLottery.getMachineLotteryOrder(machineInfo.machine_id);
    let productList = lotteryInfo.productList.map(function (currentValue) {
      currentValue.remain = currentValue.total;
      return currentValue;
    });

    let valueToSet = {
      machineId: machineInfo.machine_id,
      name: lotteryInfo.name,
      bannerImg: lotteryInfo.bannerImg,
      status: 1,
      timeTitle: currentTimeTitle + 1,
      order: currentOrder + 1,
      cardRemain: lotteryInfo.cardTotal,
      cardTotal: lotteryInfo.cardTotal,
      price: lotteryInfo.price,
      topImg: lotteryInfo.topImg,
      productList: productList,
      productPreview: lotteryInfo.productPreview,
    };

    const newMachineLottery = await MachineLottery.create(valueToSet).intercept('E_UNIQUE', () => {
      return {lotteryDuplicate: {errorMsg: sails.__('The code duplicated.')}}
    }).fetch();

    await Lottery.updateOne({id: inputs.lotteryId}).set({status: 2});

    // 生成日志
    await MachineLog.create({
      machineId: newMachineLottery.machineId,
      lotteryName: `${newMachineLottery.name} 第${newMachineLottery.timeTitle}期`,
      desc: '一番赏生成',
      category: '一番赏',
      operator: this.req.me.fullName,
      lottery: newMachineLottery.id,
      user: this.req.me.id,
    });
  }

};
