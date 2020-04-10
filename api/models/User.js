/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    accountName: {
      type: 'string',
      required: true,
      unique: true,
    },

    emailAddress: {
      type: 'string',
      description: 'The email address for this user.',
      required: true,
      unique: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
    },

    isSuperAdmin: {
      type: 'boolean',
      description: 'Whether this user is a "super admin" with extra permissions, etc.'
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1502844074211
    },

    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },

    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: 1502844074211
    },

    role: {
      model: 'Role'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  findUsers: async function (opts) {
    let userRecords = [];
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const name = 'find';
    let postbody = {
      tableName: 'admin-user',
      where: opts
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      let result = JSON.parse(response.data.resp_data);
      userRecords = result.data;
    } else {
      throw new Error('cloud error');
    }

    return userRecords;
  },

  findOneUser: async function (opts) {

    var userRecord = null;
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const name = 'find';
    let postbody = {
      tableName: 'admin-user',
      where: opts
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      let result = JSON.parse(response.data.resp_data);
      userRecord = result.data[0];
    } else {
      throw new Error('cloud error');
    }

    return userRecord;
  },


  updateUser: async function (where, data) {

    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const name = 'update';
    let postbody = {
      tableName: 'admin-user',
      where: where,
      data: data
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      let result = JSON.parse(response.data.resp_data);
      return result;
    } else {
      throw new Error('cloud error');
    }

  }
};
