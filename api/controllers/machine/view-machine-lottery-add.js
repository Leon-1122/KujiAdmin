module.exports = {


  friendlyName: 'View machine lottery add',


  description: 'Display "Machine lottery add" page.',

  inputs: {},

  exits: {

    success: {
      viewTemplatePath: 'pages/machine/machine-lottery-add',
    },

  },


  fn: async function () {

    var machineList = await Machine.find();
    var lotteryList = await Lottery.find({status: {'<': 9}});

    return {
      pagename: 'machine-lottery-add',
      machineList: machineList,
      lotteryList: lotteryList
    };

  }


};

