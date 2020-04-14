module.exports = {


  friendlyName: 'report app visit',


  description: 'report app visit',


  inputs: {
    machineId: {
      type: 'string',
      required: true
    },
  },


  exits: {
    success: {
      description: 'add queue success.',
    },

    wxUserNotExist: {
      description: `WxUser not exist.`,
      responseType: 'badRequest'
    },

    machineNotExist: {
      description: `Machine not exist.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    if (!this.req.headers.userid) {
      throw "wxUserNotExist";
    }

    const userId = this.req.headers.userid;

    const machineInfo = await Machine.find({machine_id: inputs.machineId});
    if (machineInfo.length === 0) {
      throw "machineNotExist";
    }

    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    const formattedDate = await sails.helpers.formatTimestamp.with({timestamp: date.getTime()});

    await VisitHistory.create({
      machineId: inputs.machineId,
      userId: userId,
      visitDate: formattedDate.substring(0, 10)
    });

    return ({
      code: 0,
      msg: 'ok',
    });
  }

};
