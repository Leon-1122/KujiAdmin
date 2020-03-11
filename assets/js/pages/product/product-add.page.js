//ProductAddForm validation
$(function () {
  if (!$('#product-add-form').length) {
    return false;
  }

  $('#getProductInfo').click(async function () {
    if ($('#ppids').val().length === 0) {
      showAlert("请输入产品ID");
      return;
    }
    var result = await Cloud['addProduct'].with({ppids: $('#ppids').val()})
      .tolerate((err) => {
        console.log(err);
      });

    // TODO show result
    if (result) {

    } else {

    }

  });
});
