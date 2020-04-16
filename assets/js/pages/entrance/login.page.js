//LoginForm validation
$(function () {
  if (!$('#login-form').length) {
    return false;
  }

  var loginValidationSettings = {
    rules: {
      userName: {
        required: true,
      },
      password: "required"
    },
    invalidHandler: function () {
      animate({
        name: 'shake',
        selector: '.auth-container > .card'
      });
    },
  };

  $.extend(loginValidationSettings, config.validations);

  $('#login-form').validate(loginValidationSettings);

});

