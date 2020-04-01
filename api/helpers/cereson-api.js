module.exports = {


  friendlyName: 'Cerenson API',


  description: 'Cereson API',


  inputs: {
    api: {
      type: 'string',
      required: true
    },

    params: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'call cereson api success',
    },

  },

  fn: async function (inputs) {
    const CryptoJS = require("crypto-js")
    const axios = require('axios');
    const qs = require('querystring');
    const auth_name = sails.config.custom.auth_name, auth_password = sails.config.custom.auth_password,
      api_url = sails.config.custom.api_url, timestamp = Math.ceil(Date.now() / 1000);

    let api = inputs.api;
    let params = {};
    if (inputs.params) {
      params = inputs.params;
    }

    let string1 = CryptoJS.MD5(auth_password + timestamp).toString().toUpperCase();
    let arr = [];
    for (let i in params) {
      if (!_.isArray(params[i])) {
        arr.push(i + "=" + params[i]);
      }
    }
    arr.sort();
    let string2 = string1 + arr.join(',');
    let sign = CryptoJS.MD5(string2).toString().toUpperCase();

    let postData = {
      auth_name,
      timestamp,
      sign,
      api,
      params: JSON.stringify(params)
    };

    sails.log(`cereson api request: ${JSON.stringify(postData)}`);
    let response = await axios.post(api_url, qs.stringify(postData));
    sails.log(`cereson api response: ${response.status} ${response.statusText} ${JSON.stringify(response.data)}`);

    if (response.data) {
      return response.data;
    } else {
      throw new Error('System Error');
    }
  }

};

