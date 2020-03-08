module.exports = {


  friendlyName: 'Get access token',


  description: '',


  inputs: {},


  exits: {

    success: {
      outputFriendlyName: 'Access token',
    },

  },

  fn: async function (inputs) {

    // Get access token.
    const fs = require('fs');
    const path = require('path');
    const fileName = path.resolve(__dirname, '../../.tmp/accesstoken.json');
    var accessToken, isAvailable = false;

    if (fsExistsSync(fileName)) {
      var tokenObj = JSON.parse(fs.readFileSync(fileName));
      if (tokenObj.expires_when > Date.parse(new Date()) / 1000 + 300) {
        accessToken = tokenObj.access_token;
        isAvailable = true;
      }
    }

    if (!isAvailable) {
      const axios = require('axios');
      const APPID = sails.config.custom.appid, APPSECRET = sails.config.custom.appsecret;
      let response = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`);

      if (response.data && response.data.errcode === undefined) {
        var data = response.data;
        data.expires_when = data.expires_in + Date.parse(new Date()) / 1000;
        accessToken = data.access_token;
        fs.writeFileSync(fileName, JSON.stringify(data));
      }
    }

    // Send back the result through the success exit.
    return accessToken;

  }

};

function fsExistsSync(path) {
  try {
    const fs = require('fs');
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

