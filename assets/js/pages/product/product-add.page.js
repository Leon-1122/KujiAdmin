//ProductAddForm validation
$(function () {
  if (!$('#product-add-form').length) {
    return false;
  }

  $('#getProductInfo').click(async function () {
    if ($('#ppids').val().length === 0) {
      showAlert($.validator.messages.needProductId);
      return;
    }

    $('#loading').show();

    var result = await Cloud['addProduct'].with({ppids: $('#ppids').val()})
      .tolerate((err) => {
        console.log(err);
      });

    $('#loading').hide();
    if (result && result.data) {
      var content = '';
      result.data.forEach(function (v) {
        content += `<p>${v.item}: ${v.msg}</p>`;
      });
      showSuccessMsg(content);
    } else {
      showErrorMsg(`<p>${$.validator.messages.badRequest}</p>`);
    }

  });
});
