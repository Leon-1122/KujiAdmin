/**
 * MachineStock.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'machine_stock',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    machine_id: {
      type: 'string',
      description: '机器ID'
    },
    quantity: {
      type: 'number',
      description: '商品数量'
    },
    sale_price: {
      type: 'number',
      description: '商品售价'
    },
    sku: {
      type: 'string',
      description: '商品SKU'
    },
    mismatch_quantity: {
      type: 'number',
      description: '不匹配数量'
    },
    product_id: {
      type: 'string',
      description: '商品ID'
    },
    market_price: {
      type: 'number',
      description: '市场售价'
    },
    reserver_quantity: {
      type: 'number',
      description: '预留数量'
    },
    is_id_card_presented_item: {
      type: 'number',
      description: '是否需要实名购买'
    },
    slot_max_count: {
      type: 'json',
      description: '对应机型可设置的商品最大数量'
    },
    name: {
      type: 'string',
      description: '商品名称'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

