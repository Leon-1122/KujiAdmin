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
      description: 'The requesting ppids have been successfully added.',
    },
  },


  fn: async function (inputs) {
    // remove empty value and trim the values, return unique values
    var machineIds = _.uniq(_.compact(inputs.machineIds.split('\n')), function (n) {
      return n.trim();
    });

    // TODO get machine info
    machineIds.forEach(machineId => console.log(machineId));
  }

};
