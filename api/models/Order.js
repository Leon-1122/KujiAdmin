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

