module.exports = {


  friendlyName: 'Take out product',


  description: 'Take out product.',


  inputs: {

    machineId: {
      type: 'string',
      required: true
    },

    items: {
      type: 'ref',
      required: true
    },
  },


  exits: {
    success: {
      description: 'The requesting products have been successfully taken out.',
    },

    takeOutProductFailed: {
      description: `Take out product failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {
    let result = {};
    const api = 'remote_deliver';
    // TODO 生成外部订单号
    const orderNo = 'RT' + Date.now();
    let params = {out_order_no: orderNo, machine_id: inputs.machineId, items: inputs.items};
    let response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
      console.log(err);
      return 'takeOutProductFailed';
    });

    if (response.status_code === 0 && response.data.success) {
      result = {item: inputs.machineId, status: 'ok', msg: response.msg};
    } else {
      result = {item: inputs.machineId, status: 'ng', msg: response.msg};
    }

    return {data: result};
  }

};
