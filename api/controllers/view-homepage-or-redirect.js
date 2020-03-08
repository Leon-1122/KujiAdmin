module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the login page.',
      viewTemplatePath: 'pages/entrance/login'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to an internal page depending on that user\'s account status.'
    },

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect: '/welcome'};
    }

    return {};
  }

};
