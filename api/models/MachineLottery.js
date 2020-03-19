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

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  // 分页查询
  findPagedList: async function (where, limit, skip, orderBy) {
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const collection = 'project';
    let result = null;

    let order = '';
    if (orderBy) {
      orderBy.forEach(o => order += `.orderBy("${o.fieldName}", "${o.order}")`);
    }
    let postbody = {
      env: env,
      query: `db.collection("${collection}")` + (where ? `.where(${where})` : '') + `.limit(${limit}).skip(${skip})` + order + `.get()`
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/databasequery?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      let data = [];
      if (response.data.data) {
        response.data.data.forEach(record => data.push(JSON.parse(record)));
      }

      let pager = response.data.pager;
      let numberOfPages = Math.ceil(pager.Total / pager.Limit);
      let page = Math.ceil((pager.Offset + 1) / pager.Limit);
      let nextPage = page + 1;
      let meta = {
        page: page,
        perPage: pager.Limit,
        previousPage: (page > 1) ? page - 1 : false,
        nextPage: (numberOfPages >= nextPage) ? nextPage : false,
        pageCount: numberOfPages,
        total: pager.Total,
      };

      result = {
        meta: meta,
        data: data
      };

    } else {
      throw new Error('cloud error');
    }

    return result;
  },

  // 获取详细信息
  findDetail: async function (id) {
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const mainCollection = 'project';
    const detailCollection = 'project-detail';
    let main = null;
    let detail = null;

    // 获取主表数据
    let postbody = {
      env: env,
      query: `db.collection("${mainCollection}").doc("${id}").get()`
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/databasequery?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      if (response.data.data) {
        response.data.data.forEach(record => main = JSON.parse(record));
      }

    } else {
      throw new Error('cloud error');
    }

    // 获取详细表数据
    postbody = {
      env: env,
      query: `db.collection("${detailCollection}").where({projectId: "${id}"}).limit(1).get()`
    };
    response = await axios.post(
      `https://api.weixin.qq.com/tcb/databasequery?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      response.data.data.forEach(record => detail = JSON.parse(record));
    } else {
      throw new Error('cloud error');
    }

    return {main, detail};
  },

  // 删除
  deleteMachineLottery: async function (id) {
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const mainCollection = 'project';
    const detailCollection = 'project-detail';
    let result = 0;

    // 删除主表数据
    let postbody = {
      env: env,
      query: `db.collection("${mainCollection}").doc("${id}").remove()`
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/databasedelete?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      result = response.data.deleted;
    } else {
      throw new Error('cloud error');
    }

    // 删除详细表数据
    postbody = {
      env: env,
      query: `db.collection("${detailCollection}").where({projectId: "${id}"}).remove()`
    };
    response = await axios.post(
      `https://api.weixin.qq.com/tcb/databasedelete?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      result += response.data.deleted;
    } else {
      throw new Error('cloud error');
    }

    return result;
  },

  // 激活售货机一番赏
  activeMachineLottery: async function (id) {
    let accessToken = await sails.helpers.getAccessToken();

    const axios = require('axios');
    const env = sails.config.custom.envname;
    const mainCollection = 'project';
    const detailCollection = 'project-detail';
    let timestamp = Date.now();
    let result = 0;

    // 更新主表数据
    let postbody = {
      env: env,
      query: `db.collection("${mainCollection}").doc("${id}").update({data:{canTap: true, comingSoon: false, updatedAt: ${timestamp}}})`
    };
    let response = await axios.post(
      `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      result = response.data.modified;
    } else {
      throw new Error('cloud error');
    }

    // 更新详细表数据
    postbody = {
      env: env,
      query: `db.collection("${detailCollection}").where({projectId: "${id}"}).update({data:{openStatus: true, updatedAt: ${timestamp}}})`
    };
    response = await axios.post(
      `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${accessToken}`,
      postbody
    );

    if (response.data && response.data.errcode === 0) {
      result += response.data.modified;
    } else {
      throw new Error('cloud error');
    }

    return result;
  },
};
