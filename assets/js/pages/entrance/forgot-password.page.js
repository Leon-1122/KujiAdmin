//ForgotPasswordForm validation
$(function () {
  if (!$('#forgot-password-form').length) {
    return false;
  }

  var forgotPasswordValidationSettings = {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    invalidHandler: function () {
      animate({
        name: 'shake',
        selector: '.auth-container > .card'
      });
    },
  };

  $.extend(forgotPasswordValidationSettings, config.validations);

  $('#forgot-password-form').validate(forgotPasswordValidationSettings);
});
