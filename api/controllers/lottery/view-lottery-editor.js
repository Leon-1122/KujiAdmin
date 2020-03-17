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

    var levelInfo = await Code.find({category: 'level'}).sort('order ASC');

    if (inputs.id) {
      lotteryInfo = await Lottery.findOne({id: inputs.id});

      if (!lotteryInfo) {
        throw "lotteryNotExist";
      }

      lotteryInfo.productPreview.map(function (item) {
        levelInfo = _.reject(levelInfo, function (el) {
          return el.code === item.level;
        })
      });
    }

    return {
      pagename: 'lottery-editor',
      lottery: lotteryInfo,
      level: levelInfo,
    };

  }

};

