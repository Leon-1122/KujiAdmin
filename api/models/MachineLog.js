/**
 * MachineLog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'machine_log',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    machineId: {
      type: 'string',
    },
    lotteryName: {
      type: 'string',
      allowNull: true
    },
    orderNo: {
      type: 'string',
      allowNull: true
    },
    level: {
      type: 'string',
      allowNull: true
    },
    productName: {
      type: 'string',
      allowNull: true
    },
    num: {
      type: 'number',
      allowNull: true
    },
    desc: {
      type: 'string',
    },
    category: {
      type: 'string',
    },
    operator: {
      type: 'string',
    },
    lottery: {
      model: 'MachineLottery'
    },
    user: {
      model: 'User'
    },
    wxUser: {
      model: 'WxUser'
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

