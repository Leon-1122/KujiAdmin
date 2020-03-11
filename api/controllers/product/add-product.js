module.exports = {


  friendlyName: 'Add product',


  description: 'Add product.',


  inputs: {

    ppids: {
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
    var ppids = _.uniq(_.compact(inputs.ppids.split('\n')), function (n) {
      return n.trim();
    });

    // TODO get product info
    ppids.forEach(ppid => console.log(ppid));
  }

};
