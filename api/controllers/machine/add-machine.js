module.exports = {


  friendlyName: 'Add machine',


  description: 'Add machine.',


  inputs: {

    machineIds: {
      type: 'string',
      required: true
    },

  },


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
    // remove empty value and trim the values, return unique values
    let machineIds = _.uniq(_.compact(inputs.machineIds.split('\n')), function (n) {
      return n.trim();
    });

    let result = [];
    const api = 'get_machines';
    for (const machineId of machineIds) {
      let params = {machine_id: machineId};
      let response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
        console.log(err);
        return 'getMachineFailed';
      });

      if (response.status_code === 0) {
        let data = response.data;
        let machineInfo = await Machine.find({machine_id: data.machine_id});

        if (machineInfo.length > 0) {
          await Machine.update({machine_id: data.machine_id}).set(data);
        } else {
          await Machine.create(data);
        }

        result.push({item: machineId, status: 'ok', msg: response.msg});
      } else {
        result.push({item: machineId, status: 'ng', msg: response.msg});
      }
    }

    return {data: result};
  }

};
