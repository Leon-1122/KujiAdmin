/**
 * MachineLottery.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {

  tableName: 'machine_lottery',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    machineId: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    bannerImg: {
      type: 'string',
      required: true,
    },
    timeTitle: {
      type: 'number',
      required: true,
    },
    order: {
      type: 'number',
      required: true,
    },
    status: {
      type: 'number',
      defaultsTo: 1,
      description: '1:即将到来 2:在售 3:售磐',
    },
    topImg: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    cardTotal: {
      type: 'number',
      required: true,
    },
    cardRemain: {
      type: 'number',
      required: true,
    },
    productList: {
      type: 'json'
    },
    productPreview: {
      type: 'json'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  // 获取指定一番赏期数
  getMachineLotteryTimeTitle: async function (machineId, name) {
    let timeTitle = 0;
    let lotteryInfo = await MachineLottery.find({
      machineId: machineId,
      name: name
    }).limit(1).sort('timeTitle DESC');

    if (lotteryInfo.length > 0) {
      timeTitle = lotteryInfo[0].timeTitle
    }

    return timeTitle;
  },

  // 获取指定售货机一番赏排序
  getMachineLotteryOrder: async function (machineId) {
    let order = 0;
    let lotteryInfo = await MachineLottery.find({
      machineId: machineId,
    }).limit(1).sort('order DESC');

    if (lotteryInfo.length > 0) {
      order = lotteryInfo[0].order
    }

    return order;
  },

};
