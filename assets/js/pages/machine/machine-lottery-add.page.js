//MachineLotteryAddForm validation
$(function () {
  if (!$('#machine-lottery-add-form').length) {
    return false;
  }

  var machineLotteryAddValidationSettings = {
    rules: {
      machineId: "required",
      lotteryId: "required"
    },
  };

  $.extend(machineLotteryAddValidationSettings, config.validations);

  $('#machine-lottery-add-form').validate(machineLotteryAddValidationSettings);
});
