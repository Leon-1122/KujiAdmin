module.exports = async function (req, res, proceed) {

  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (!req.me) {
    return res.unauthorized();
  }//•

  // Then check that this user has permission to access.
  var module = req.route.path.split('/')[1];
  if (module === 'api') {
    module = req.route.path.split('/')[3];
  }
  if (!req.me.permissionModules.includes(module)) {
    return res.forbidden();
  }//•

  // IWMIH, we've got ourselves a "super admin".
  return proceed();

};
