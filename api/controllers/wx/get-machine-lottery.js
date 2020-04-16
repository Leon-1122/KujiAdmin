module.exports = {


  friendlyName: 'get lotteries of specify machine',


  description: 'get lotteries of specify machine',


  inputs: {

    machineId: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'get lotteries success.',
    },
  },


  fn: async function (inputs) {

    let lotteryList = await MachineLottery.find({
        where: {
          machineId: inputs.machineId,
          status: {'<': 9}
        },
        select: ['name', 'bannerImg', 'timeTitle', 'status'],
        sort: 'order DESC'
      }
    );

    return ({
      code: 0,
      data: {
        lotteryList,
      },
      msg: 'ok',
    });
  }

};
