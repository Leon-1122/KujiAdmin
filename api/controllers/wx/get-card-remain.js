module.exports = {


  friendlyName: 'get card remain',


  description: 'get card remain',


  inputs: {

    lotteryId: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'get card remain success.',
    },
  },


  fn: async function (inputs) {

    let lotteryInfo = await MachineLottery.findOne({
        where: {
          id: inputs.lotteryId
        },
        select: ['cardRemain'],
      }
    );

    return ({
      code: 0,
      data: {
        cardRemain: lotteryInfo.cardRemain,
      },
      msg: 'ok',
    });
  }

};
