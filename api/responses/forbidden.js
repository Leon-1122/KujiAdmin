/**
 * Module dependencies
 */

// n/a


module.exports = function forbidden(data) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Set status code
  res.status(403);

  // If the request wants JSON, send back the appropriate status code.
  if (req.wantsJSON || !res.view) {
    return res.sendStatus(403);
  }

  return res.view('403', {}, function (err, html) {
    // If a view error occured, fall back to JSON.
    if (err) {
      return res.sendStatus(403);
    }

    return res.send(html);
  });

};
