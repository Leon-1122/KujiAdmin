/**
 * Machine.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    sale_income: {
      type: 'string',
      description: '最近7天销售额'
    },
    district: {
      type: 'string',
      description: '行政区'
    },
    machine_type: {
      type: 'string',
      description: '机器类型'
    },
    state: {
      type: 'string',
      description: '地区/直辖市/省'
    },
    sale_count: {
      type: 'number',
      description: '最近7天销量'
    },
    is_wc_show: {
      type: 'number',
      description: '是否微信展示'
    },
    street: {
      type: 'string',
      description: '街道'
    },
    machine_id: {
      type: 'string',
      description: '机器ID'
    },
    software_version: {
      type: 'string',
      description: '软件版本'
    },
    lng: {
      type: 'string',
      description: '经度'
    },
    location_type: {
      type: 'string',
      description: '位置类型'
    },
    lat: {
      type: 'string',
      description: '纬度'
    },
    icon_url: {
      type: 'string',
      description: '图标URL'
    },
    country: {
      type: 'string',
      description: '国家'
    },
    zip: {
      type: 'string',
      description: '编码'
    },
    upgrade_time: {
      type: 'string',
      description: '升级时间'
    },
    assign_time: {
      type: 'string',
      description: '分配时间'
    },
    notes: {
      type: 'string',
      description: '备注'
    },
    inventory: {
      type: 'number',
      description: '库存'
    },
    location: {
      type: 'string',
      description: '位置'
    },
    ai_status: {
      type: 'string',
      description: '正常/维护状态'
    },
    city: {
      type: 'string',
      description: '城市'
    },
    logo_url: {
      type: 'string',
      description: 'logo URL'
    },
    mac: {
      type: 'string',
      description: '机器MAC地址'
    },
    machine_name: {
      type: 'string',
      description: '机器名字'
    },
    building: {
      type: 'string',
      description: '楼'
    },
    ai_time: {
      type: 'string',
      description: '状态改变时间'
    },
    oo_status: {
      type: 'string',
      description: '在线/离线状态'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

