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
      description: '捡货方式'
    },
    sale_channel: {
      type: 'number',
      description: '销售渠道'
    },
    is_gift: {
      type: 'number',
      description: '是否是赠品'
    },
    eject_weight: {
      type: 'number',
      description: '多件同出商品权重'
    },
    supplier_name: {
      type: 'string',
      description: '供应商'
    },
    model: {
      type: 'string',
      description: '规格参数'
    },
    add_time: {
      type: 'string',
      description: '增加时间'
    },
    is_virtual: {
      type: 'number',
      description: '是否是虚拟商品'
    },
    is_id_card_presented_item: {
      type: 'number',
      description: '是否需要实名'
    },
    main_pic_url: {
      type: 'string',
      description: '主图片url'
    },
    package_length: {
      type: 'number',
      description: '包装长度'
    },
    package_width: {
      type: 'number',
      description: '包装宽度'
    },
    supplier_id: {
      type: 'string',
      description: '供应商ID'
    },
    fetch_style: {
      type: 'string',
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
      description: '条码'
    },
    main_pic_id: {
      type: 'string',
      description: '主图片ID'
    },
    sale_price: {
      type: 'string',
      description: '售价'
    },
    package_height: {
      type: 'number',
      description: '包装高度'
    },
    last_update_time: {
      type: 'string',
      description: '最近更新时间'
    },
    description: {
      type: 'json',
      description: '描述'
    },
    is_date_sensitive: {
      type: 'number',
      description: '是否时间敏感'
    },
    service_phone: {
      type: 'string',
      description: '服务电话'
    },
    load_region: {
      type: 'number',
      description: '上架区域：0：原始机组 1：易触机组'
    },
    market_price: {
      type: 'string',
      description: '市场价格'
    },
    slot_max_count: {
      type: 'json',
      description: '槽位最大计数'
    },
    pre_alert_time: {
      type: 'number',
      description: '（到期日前）通知时间'
    },
    sku: {
      type: 'string',
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

