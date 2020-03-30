//LotteryEditorForm validation
var productTarget = null;
$(function () {
  if (!$('#lottery-editor-form').length) {
    return false;
  }

  baguetteBox.run('.images-container');

  // 图片上传
  $('.image-container .controls .control-btn.upload').on('click', function (e) {
    mediaTarget = $(e.currentTarget);
    $('#modal-media').modal();
    return false;
  });

  $.validator.addMethod("arrayRequired", function (value, element, param) {
    var flag = true;
    $(`form input[name=${param}]`).each(function () {
      var value = $(this).val();
      if (!value && flag) {
        flag = false;
      }
    });
    return flag
  }, $.validator.messages.required);

  $.validator.addMethod("arrayDigits", function (value, element, param) {
    var flag = true;
    $(`form input[name=${param}]`).each(function () {
      var value = $(this).val();
      if (!/^\d+$/.test(value) && flag) {
        flag = false;
      }
    });
    return flag
  }, $.validator.messages.digits);

  var lotteryEditorValidationSettings = {
    rules: {
      name: "required",
      price: {
        required: true,
        digits: true
      },
      cardTotal: {
        required: true,
        digits: true
      },
      bannerImg: "required",
      topImg: "required",
      productImg: "required",
      awardName: {
        arrayRequired: 'awardName'
      },
      total: {
        arrayRequired: 'total',
        arrayDigits: 'total',
      }
    },
    beforeSubmit: function (form) {
      var productPreview = [];
      var productList = [];
      $('#productPreviewContainer .float-card').each(function (i, e) {
        var level = $(this).find('.card-header .control-btn.remove').data('level');
        var awardName = $(this).find('input[name=awardName]').val();
        var productImg = $(this).find('input[name=productImg]').val();
        productPreview.push({
          level: level,
          name: awardName,
          productImg: productImg
        });
        $(this).find('.table tbody tr').each(function (ii, ee) {
          var img = $(this).find('.product-img').attr('src');
          var sku = $(this).find('.product-sku').text();
          var productName = $(this).find('.product-name').val();
          var productTotal = $(this).find('.product-total').val();
          productList.push({
            sku: sku,
            level: level,
            total: parseInt(productTotal),
            name: productName,
            productImg: img
          });
        });
      });

      $(form).find('#productPreview').val(JSON.stringify(productPreview));
      $(form).find('#productList').val(JSON.stringify(productList));
      calculateCardTotal();
    }
  };

  $.extend(lotteryEditorValidationSettings, config.validations);
  $('#lottery-editor-form').validate(lotteryEditorValidationSettings);

});

// 添加奖项
function addAward() {
  var addLevel = $('#addLevel').val();
  if (addLevel) {
    var newAward = $('#awardTemplate').clone();
    newAward.removeAttr('style');
    newAward.removeAttr('id');
    newAward.find('.card-header .header-block .title').text(addLevel + '赏');
    newAward.find('.card-header .header-block .remove').data('level', addLevel);
    newAward.find('.image-container .controls .control-btn.upload').on('click', function (e) {
      mediaTarget = $(e.currentTarget);
      $('#modal-media').modal();
      return false;
    });
    $(`#addLevel option[value="${addLevel}"]`).remove();
    $('#productPreviewContainer').append(newAward);
  }
}

// 删除奖项
function deleteAward(element) {
  // 删除奖项添加进下拉列表
  var level = $(element).data('level');
  $('#addLevel').append(`<option value="${level}">${level}</option>`);

  // 下拉列表重新排序
  var $options = $('#addLevel option');
  $options.sort(function (a, b) {
    var valA = $(a).val();
    var valB = $(b).val();
    if (valA < valB) {
      return -1;
    } else {
      return 1;
    }
  });
  $options.detach().appendTo('#addLevel');
  $('#addLevel').val('');

  $(element).parents('.float-card').remove();
  calculateCardTotal();
}

// 删除奖项中的商品
function deleteAwardProduct(element) {
  $(element).parents('tr').remove();
  calculateCardTotal();
}

// 添加奖项中的商品
function addAwardProduct(element) {
  var $tbody = $(element).parent().siblings('.table-responsive').find('tbody');
  var skuArray = [];
  $tbody.find('tr').each(function (i, e) {
    skuArray.push($(e).find('.product-sku').text());
  });

  $("#modal-product .item:not(.item-list-header) input.checkbox:checked").each(function (i, e) {
    var selectedRow = $(e).parents('.item-row');
    var productImg = selectedRow.find('.product-img').val();
    var productSku = selectedRow.find('.product-sku').val();
    var productName = selectedRow.find('.product-name').val();

    // 已存在sku跳过
    if ($.inArray(productSku, skuArray) < 0) {
      var newProduct = $('#awardProductTemplate').clone();
      newProduct.removeAttr('style');
      newProduct.removeAttr('id');
      newProduct.find('.product-img').attr('src', productImg);
      newProduct.find('.product-sku').text(productSku);
      newProduct.find('.product-name').val(productName);
      $tbody.append(newProduct);
    }
  });
}

// 计算奖券总数
function calculateCardTotal() {
  var total = 0;
  $('input[name=total]').each(function () {
    var level = $(this).parents('.float-card').find('.card-header .header-block .remove').data('level');
    if ($(this).val() && !isNaN($(this).val()) && level !== 'Last One') {
      total += parseInt($(this).val());
    }
  });
  $('#cardTotal').val(total);
}
