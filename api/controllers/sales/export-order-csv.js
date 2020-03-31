module.exports = {


  friendlyName: 'Export order csv',


  description: 'Export order csv.',

  inputs: {

    searchFor: {
      type: 'string',
    },

  },

  exits: {

    success: {}

  },


  fn: async function (inputs) {

    let criteria = {};
    if (inputs.searchFor) {
      criteria = {
        or: [
          {'title': {'contains': inputs.searchFor}},
          {'machineId': {'contains': inputs.searchFor}},
          {'orderNo': {'contains': inputs.searchFor}},
        ]
      };
    }

    const orderList = await Order.find({
      select: ['orderNo', 'buyerNick', 'machineId', 'title', 'price', 'num', 'totalFee', 'status', 'createdAt', 'updatedAt'],
      where: criteria,
      sort: 'createdAt DESC'
    });

    const orderStatusCode = await Code.find({category: 'orderStatus'}).sort('order ASC');
    const editedOrderList = orderList.map(function (order) {
      orderStatusCode.forEach(function (statusCode) {
        if (statusCode.code === order.status) {
          order.status = statusCode.desc;
        }
      });
      order.createdAt = formatTimestamp(order.createdAt);
      order.updatedAt = formatTimestamp(order.updatedAt);
      return order;
    });

    const {parse} = require('json2csv');
    const fields = ['orderNo', 'buyerNick', 'machineId', 'title', 'price', 'num', 'totalFee', 'status', 'createdAt', 'updatedAt'];
    const opts = {fields};
    // UTF-8格式文件添加BOM头解决excel打开乱码
    const csv = '\ufeff' + parse(editedOrderList, opts);
    this.res.set('Content-Type', 'text/csv;');
    this.res.attachment(`orders_${Date.now()}.csv`);
    return this.res.send(csv);
  }

};

function formatTimestamp(timestamp) {
  var date = new Date(timestamp + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ');
}
