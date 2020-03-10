module.exports.register = function (handlebars) {
  handlebars.registerHelper('unescape', function (n, block) {
    if (n) {
      return unescape(n.replace(/\\u/g, '%u'));
    }
    return n;
  });
};
