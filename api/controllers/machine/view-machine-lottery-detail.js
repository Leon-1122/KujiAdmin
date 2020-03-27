module.exports = {


  friendlyName: 'View machine lottery detail',


  description: 'Display "Machine lottery detail" page.',

  inputs: {

    id: {
      type: 'string',
      required: true
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/machine/machine-lottery-detail',
    },

    machineLotteryNotExist: {
      description: `Machine lottery not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    var machineLotteryInfo;

    machineLotteryInfo = await MachineLottery.findOne({id: inputs.id});

    if (!machineLotteryInfo) {
      throw "machineLotteryNotExist";
    }
    var machineLotteryStatusCode = await Code.find({category: 'machineLotteryStatus'}).sort('order ASC');

    return {
      pagename: 'machine-lottery-detail',
      machineLottery: machineLotteryInfo,
      machineLotteryStatusCode: machineLotteryStatusCode
    };

  }


};

