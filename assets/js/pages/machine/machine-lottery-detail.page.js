//MachineLotteryDetailForm validation
$(function () {
  if (!$('#machine-lottery-detail-form').length) {
    return false;
  }

  var modalAwardValidationSettings = {
    rules: {
      level: "required",
      sku: "required",
      num: {
        required: true,
        digits: true
      }
    },
  };

  $.extend(modalAwardValidationSettings, config.validations);

  var validator = $('#modal-award-form').validate(modalAwardValidationSettings);

  $('#modal-award').on('hidden.bs.modal', function (e) {
    $('#modal-award input[type=text]').val('');
    validator.resetForm();
    $('.error-message').hide();
  });
});

function showAwardModal(mode) {
  if (mode === 1) {
    $('#modal-award .modal-title').text('增加赏');
  } else {
    $('#modal-award .modal-title').text('减少赏');
  }
  $('#mode').val(mode);
  $('#modal-award').modal({backdrop: 'static'});
}
