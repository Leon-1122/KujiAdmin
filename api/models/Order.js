/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    orderNo: {
      type: 'string',
      required: true,
      unique: true
    },
    buyerNick: {
      type: 'string',
    },
    machineId: {
      type: 'string',
    },
    status: {
      type: 'number',
      required: true,
      description: '0 未支付 1 已支付 2 已关闭'
    },
    pickStatus: {
      type: 'number',
      defaultsTo: 0,
      description: '0 未使用 1 已提货 2 已过期 3 已取消 4 取货中 6 异常'
    },
    title: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    num: {
      type: 'number',
      required: true,
    },
    totalFee: {
      type: 'number',
      required: true,
    },
    payTime: {
      type: 'number',
      allowNull: true,
    },
    pickCode: {
      type: 'string',
      allowNull: true,
    },
    products: {
      type: 'json',
    },
    notifyData: {
      type: 'json',
    },
    wxUser: {
      model: 'WxUser'
    },
    machine: {
      model: 'Machine'
    },
    lottery: {
      model: 'MachineLottery'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

