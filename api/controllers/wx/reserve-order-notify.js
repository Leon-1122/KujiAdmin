module.exports = {


  friendlyName: 'reserve order notify',


  description: 'reserve order notify',


  inputs: {

    machine_id: {
      type: 'string',
    },

    order_no: {
      type: 'string',
    },

    product_names: {
      type: 'string',
    },

    pick_code: {
      type: 'string',
    },

    quantity: {
      type: 'number',
    },

    status: {
      type: 'number',
    },
  },


  exits: {
    success: {
      description: 'reserve order notify success.',
    },

    orderNotExist: {
      description: `Order  not exist.`,
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs) {

    let orderList = await Order.find({orderNo: inputs.order_no});

    if (orderList.length === 0) {
      throw "orderNotExist";
    }

    await Order.update({orderNo: inputs.order_no}).set({
      pickStatus: inputs.status,
      notifyData: {
        machine_id: inputs.machine_id,
        order_no: inputs.order_no,
        product_names: inputs.product_names,
        pick_code: inputs.pick_code,
        quantity: inputs.quantity,
        status: inputs.status,
      }
    });

    return 'success';
  }
};
