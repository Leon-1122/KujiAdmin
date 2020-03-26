/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    category: {
      type: 'json',
      description: '种类'
    },
    product_pic: {
      type: 'json',
      description: '商品图片'
    },
    manufacturer: {
      type: 'json',
      description: '制造商'
    },
    pick_method: {
      type: 'string',
      allowNull: true,
      description: '捡货方式'
    },
    sale_channel: {
      type: 'json',
      description: '销售渠道'
    },
    is_gift: {
      type: 'json',
      description: '是否是赠品'
    },
    eject_weight: {
      type: 'json',
      description: '多件同出商品权重'
    },
    supplier_name: {
      type: 'string',
      allowNull: true,
      description: '供应商'
    },
    model: {
      type: 'string',
      allowNull: true,
      description: '规格参数'
    },
    add_time: {
      type: 'string',
      allowNull: true,
      description: '增加时间'
    },
    is_virtual: {
      type: 'json',
      description: '是否是虚拟商品'
    },
    is_id_card_presented_item: {
      type: 'json',
      description: '是否需要实名'
    },
    main_pic_url: {
      type: 'string',
      allowNull: true,
      description: '主图片url'
    },
    package_length: {
      type: 'json',
      description: '包装长度'
    },
    package_width: {
      type: 'json',
      description: '包装宽度'
    },
    supplier_id: {
      type: 'string',
      allowNull: true,
      description: '供应商ID'
    },
    fetch_style: {
      type: 'string',
      allowNull: true,
      description: '抓取方式'
    },
    ppid: {
      type: 'string',
      description: '产品ID',
      unique: true,
    },
    name: {
      type: 'json',
      description: '名字'
    },
    upc: {
      type: 'string',
      allowNull: true,
      description: '条码'
    },
    main_pic_id: {
      type: 'string',
      allowNull: true,
      description: '主图片ID'
    },
    sale_price: {
      type: 'string',
      allowNull: true,
      description: '售价'
    },
    package_height: {
      type: 'json',
      description: '包装高度'
    },
    last_update_time: {
      type: 'string',
      allowNull: true,
      description: '最近更新时间'
    },
    description: {
      type: 'json',
      description: '描述'
    },
    is_date_sensitive: {
      type: 'json',
      description: '是否时间敏感'
    },
    service_phone: {
      type: 'string',
      allowNull: true,
      description: '服务电话'
    },
    load_region: {
      type: 'json',
      description: '上架区域：0：原始机组 1：易触机组'
    },
    market_price: {
      type: 'string',
      allowNull: true,
      description: '市场价格'
    },
    slot_max_count: {
      type: 'json',
      description: '槽位最大计数'
    },
    pre_alert_time: {
      type: 'json',
      description: '（到期日前）通知时间',
    },
    sku: {
      type: 'string',
      allowNull: true,
      description: 'SKU信息'
    },
    product_spec: {
      type: 'json',
      description: '商品参数'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

