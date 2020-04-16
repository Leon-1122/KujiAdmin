module.exports = {


  friendlyName: 'View lottery detail',


  description: 'Display "Lottery detail" page.',

  inputs: {

    id: {
      type: 'string',
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/lottery/lottery-editor',
    },

    lotteryNotExist: {
      description: `Lottery not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var lotteryInfo;

    if (inputs.id) {
      lotteryInfo = await Lottery.findOne({id: inputs.id});

      if (!lotteryInfo) {
        throw "lotteryNotExist";
      }
    }

    return {
      pagename: 'lottery-editor',
      lottery: lotteryInfo,
    };

  }

};

