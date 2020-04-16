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
        var last = $(this).find('.card-header .control-btn.remove').data('last');
        var awardName = $(this).find('input[name=awardName]').val();
        var productImg = $(this).find('input[name=productImg]').val();
        productPreview.push({
          level: level,
          name: awardName,
          productImg: productImg,
          last: last
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
            productImg: img,
            last: last
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
  var addLevel = $('#addLevel').val().trim();
  var lastChecked = $('#last').is(":checked");
  var awardAdded = false;
  var lastAdded = false;

  if (addLevel) {
    $('#productPreviewContainer .float-card').each(function (i, e) {
      var level = $(this).find('.card-header .control-btn.remove').data('level');
      var last = $(this).find('.card-header .control-btn.remove').data('last');

      if (addLevel === level) {
        awardAdded = true;
        return false;
      }

      if (lastChecked && last === true) {
        lastAdded = true;
        return false;
      }
    });

    // 检查奖项名称是否重复
    if (awardAdded) {
      showAlert('输入的奖项重复');
      return;
    }

    // 检查最终赏是否已添加
    if (lastAdded) {
      showAlert('最终赏已存在');
      return;
    }

    var newAward = $('#awardTemplate').clone();
    newAward.removeAttr('style');
    newAward.removeAttr('id');

    if (lastChecked) {
      newAward.addClass('card-warning');
    } else {
      newAward.addClass('card-info');
    }

    newAward.find('.card-header .header-block .title').text(addLevel);
    newAward.find('.card-header .header-block .remove').data('level', addLevel);
    newAward.find('.card-header .header-block .remove').data('last', lastChecked);
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
    var last = $(this).parents('.float-card').find('.card-header .header-block .remove').data('last');
    if ($(this).val() && !isNaN($(this).val()) && !last) {
      total += parseInt($(this).val());
    }
  });
  $('#cardTotal').val(total);
}
