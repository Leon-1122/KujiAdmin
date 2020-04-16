module.exports = {


  friendlyName: 'Format timestamp to UTC',


  description: '',

  inputs: {
    timestamp: {
      type: 'number'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Format timestamp',
    },

  },

  fn: async function (inputs) {
    if (!inputs.timestamp) {
      return '';
    }
    let date = new Date(inputs.timestamp + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ');
  }

};


