module.exports = {


  friendlyName: 'get project detail',


  description: 'get project detail',


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
      description: 'Get project detail success.',
    },
  },


  fn: async function (inputs) {

    let lotteryList = await MachineLottery.find({
      where: {
        machineId: inputs.machineId,
        status: {'<': 3}
      },
      select: ['id']
    }).sort('order DESC');

    let lotteryInfo = await MachineLottery.findOne({
        where: {id: inputs.lotteryId},
        select: ['cardTotal', 'cardRemain', 'topImg', 'price', 'status', 'productPreview', 'productList']
      }
    );

    let sortInfo = {};
    let count = 0;
    lotteryList.forEach(function (item) {
      count++;
      sortInfo[item.id] = count;
    });

    return ({
      code: 0,
      data: {
        count,
        sortInfo,
        lotteryInfo
      },
      msg: 'ok',
    });
  }

};
