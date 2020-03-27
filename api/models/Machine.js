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
      allowNull: true,
      description: '最近7天销售额'
    },
    district: {
      type: 'string',
      allowNull: true,
      description: '行政区'
    },
    machine_type: {
      type: 'string',
      allowNull: true,
      description: '机器类型'
    },
    state: {
      type: 'string',
      allowNull: true,
      description: '地区/直辖市/省'
    },
    sale_count: {
      type: 'json',
      description: '最近7天销量'
    },
    is_wc_show: {
      type: 'json',
      description: '是否微信展示'
    },
    street: {
      type: 'string',
      allowNull: true,
      description: '街道'
    },
    machine_id: {
      type: 'string',
      allowNull: true,
      description: '机器ID',
      unique: true
    },
    software_version: {
      type: 'string',
      allowNull: true,
      description: '软件版本'
    },
    lng: {
      type: 'string',
      allowNull: true,
      description: '经度'
    },
    location_type: {
      type: 'string',
      allowNull: true,
      description: '位置类型'
    },
    lat: {
      type: 'string',
      allowNull: true,
      description: '纬度'
    },
    icon_url: {
      type: 'string',
      allowNull: true,
      description: '图标URL'
    },
    country: {
      type: 'string',
      allowNull: true,
      description: '国家'
    },
    zip: {
      type: 'string',
      allowNull: true,
      description: '编码'
    },
    upgrade_time: {
      type: 'string',
      allowNull: true,
      description: '升级时间'
    },
    assign_time: {
      type: 'string',
      allowNull: true,
      description: '分配时间'
    },
    notes: {
      type: 'string',
      allowNull: true,
      description: '备注'
    },
    inventory: {
      type: 'json',
      description: '库存'
    },
    location: {
      type: 'string',
      allowNull: true,
      description: '位置'
    },
    ai_status: {
      type: 'string',
      allowNull: true,
      description: '正常/维护状态'
    },
    city: {
      type: 'string',
      allowNull: true,
      description: '城市'
    },
    logo_url: {
      type: 'string',
      allowNull: true,
      description: 'logo URL'
    },
    mac: {
      type: 'string',
      allowNull: true,
      description: '机器MAC地址'
    },
    machine_name: {
      type: 'string',
      allowNull: true,
      description: '机器名字'
    },
    building: {
      type: 'string',
      allowNull: true,
      description: '楼'
    },
    ai_time: {
      type: 'string',
      allowNull: true,
      description: '状态改变时间'
    },
    oo_status: {
      type: 'string',
      allowNull: true,
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

