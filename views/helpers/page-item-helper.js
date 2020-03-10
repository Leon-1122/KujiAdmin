module.exports.register = function (handlebars) {
  handlebars.registerHelper('page-item', function(page, pageCount, block) {
    var accum = '';

    var startPage = 1;
    if (page > 2) {
      startPage = page - 2;
    }
    for(var i = startPage; i < page; i++)
      accum += block.fn(i);

    var endPage = pageCount;
    if (pageCount - page > 2) {
      endPage = page + 2;
    }
    for(var i = page; i <= endPage; i++)
      accum += block.fn(i);
    return accum;
  });
};
