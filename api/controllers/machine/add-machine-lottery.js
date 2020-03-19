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
  },


  fn: async function (inputs) {
    // TODO 添加售货机一番赏
  }

};
