/**
 * Module dependencies
 */

// n/a


module.exports = function badRequest(data) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  // Log error to console
  if (!_.isUndefined(data)) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);

    if (data.code && data.code === 'E_MISSING_OR_INVALID_PARAMS') {
      // to show the error message
    }
  }

  // Set status code
  res.status(400);

  // If the request wants JSON, send back the appropriate status code.
  if (req.wantsJSON || !res.view) {
    return res.sendStatus(400);
  }

  return res.view('400', {}, function (err, html) {
    // If a view error occured, fall back to JSON.
    if (err) {
      return res.sendStatus(400);
    }

    return res.send(html);
  });

};
