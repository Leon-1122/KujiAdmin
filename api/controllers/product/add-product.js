module.exports = {


  friendlyName: 'Add product',


  description: 'Add product.',


  inputs: {

    ppids: {
      type: 'string',
      required: true
    },

  },


  exits: {
    success: {
      description: 'The requesting ppids have been successfully added.',
    },

    getProductFailed: {
      description: `Get product info failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {
    // remove empty value and trim the values, return unique values
    let ppids = _.uniq(_.compact(inputs.ppids.split('\n')), function (n) {
      return n.trim();
    });

    let result = [];
    const api = 'get_product_by_id';
    for (const ppid of ppids) {
      let params = {product_id: ppid};
      let response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
        console.log(err);
        return 'getProductFailed';
      });

      if (response.status_code === 0) {
        let data = response.data;
        let productInfo = await Product.find({ppid: data.product.ppid});

        let valueToSet = data.product;
        valueToSet.manufacturer = JSON.parse(valueToSet.manufacturer);
        valueToSet.description = JSON.parse(valueToSet.description);
        valueToSet.name = JSON.parse(valueToSet.name);
        valueToSet.slot_max_count = valueToSet.slot_max_count ? JSON.parse(valueToSet.slot_max_count) : valueToSet.slot_max_count;

        valueToSet.category = data.category;
        valueToSet.category = valueToSet.category.map(function (currentValue) {
          currentValue.name = JSON.parse(currentValue.name);
          return currentValue;
        });

        valueToSet.product_pic = data.product_pic;
        valueToSet.product_spec = data.product_spec;

        if (productInfo.length > 0) {
          await Product.update({ppid: valueToSet.ppid}).set(valueToSet);
        } else {
          await Product.create(valueToSet);
        }

        result.push({item: ppid, status: 'ok', msg: response.msg});
      } else {
        result.push({item: ppid, status: 'ng', msg: response.msg});
      }
    }

    return {data: result};
  }

};
