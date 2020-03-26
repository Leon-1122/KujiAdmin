module.exports = {


  friendlyName: 'Refresh machine stock',


  description: 'Refresh machine stock.',


  inputs: {},


  exits: {
    success: {
      description: 'The machine stock has been successfully refreshed.',
    },

    getMachineStockFailed: {
      description: `Get machine stock failed.`,
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs) {

    let machineList = await Machine.find();

    let result = [];
    const api = 'get_inventory_list';
    for (const machine of machineList) {
      let params = {machine_id: machine.machine_id, shelf_on: 1};
      let response = await sails.helpers.ceresonApi.with({api, params}).intercept(function (err) {
        console.log(err);
        return 'getMachineStockFailed';
      });

      if (response.status_code === 0) {
        let data = response.data;

        for (const stock of data) {
          let valueToSet = stock;
          valueToSet.machine_id = machine.machine_id;
          let productInfo = await Product.find({ppid: stock.product_id});
          if (productInfo.length > 0) {
            valueToSet.name = productInfo[0].name.zh_CN;
          }
          let stockInfo = await MachineStock.find({machine_id: machine.machine_id, product_id: stock.product_id});
          if (stockInfo.length > 0) {
            await MachineStock.update({machine_id: machine.machine_id, product_id: stock.product_id}).set(valueToSet);
          } else {
            await MachineStock.create(valueToSet);
          }
        }

        result.push({item: machine.machine_id, status: 'ok', msg: response.msg});
      } else {
        result.push({item: machine.machine_id, status: 'ng', msg: response.msg});
      }
    }

    return {data: result};
  }

};
