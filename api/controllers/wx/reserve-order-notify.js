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

    const orderList = await Order.find({orderNo: inputs.order_no}, {lottery: true, wxUser: true});

    if (orderList.length === 0) {
      throw "orderNotExist";
    }

    const orderInfo = orderList[0];

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

    // 生成日志
    await MachineLog.create({
      machineId: inputs.machine_id,
      lotteryName: `${orderInfo.lottery.name} 第${orderInfo.lottery.timeTitle}期`,
      orderNo: inputs.order_no,
      productName: inputs.product_names,
      num: inputs.quantity,
      desc: '预定商品取货',
      category: '一番赏',
      operator: orderInfo.wxUser.nickName,
      lottery: orderInfo.lottery.id,
      wxUser: orderInfo.wxUser.id
    });

    return 'success';
  }
};
