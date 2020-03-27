module.exports = {


  friendlyName: 'Add machines',


  description: 'Add machines.',


  inputs: {},


  exits: {
    success: {
      description: 'The requesting machines have been successfully added.',
    },

    getMachineFailed: {
      description: `Get machine info failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {
    let result = {};
    const api = 'get_machines';
    let response = await sails.helpers.ceresonApi.with({api}).intercept(function (err) {
      console.log(err);
      return 'getMachineFailed';
    });

    if (response.status_code === 0) {
      let machineList = response.data;
      for (const machineData of machineList) {
        let machineInfo = await Machine.find({machine_id: machineData.machine_id});
        if (machineInfo.length > 0) {
          await Machine.update({machine_id: machineData.machine_id}).set(machineData);
        } else {
          await Machine.create(machineData);
        }
      }
      result = {status: 'ok', msg: response.msg};
    } else {
      result = {status: 'ng', msg: response.msg};
    }

    return {data: result};
  }

};
