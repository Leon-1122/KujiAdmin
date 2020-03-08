module.exports.register = function (handlebars) {
  handlebars.registerHelper('date', function(timestamp) {
    if (!timestamp) {
      return '';
    }
    var date = new Date(timestamp + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ');
  });
};
