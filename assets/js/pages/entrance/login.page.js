//LoginForm validation
$(function() {
  if (!$('#login-form').length) {
    return false;
  }

  var loginValidationSettings = {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: "required"
    },
    invalidHandler: function() {
      animate({
        name: 'shake',
        selector: '.auth-container > .card'
      });
    },
    // submit handler
    submitHandler: function(form) {
      $.ajax({
        type: 'put',
        url: '/api/v1/' + $(form).attr('action'),
        data: $(form).serialize(),
        success: function(data) {
          $('.error-message').hide();
          window.location = '/';
        },
        error: function(xhr) {
          if (xhr.responseJSON) {
            if (xhr.responseJSON.problems) {
              $.each(xhr.responseJSON.problems, function(k, v) {
                $('.error-message').append('<p>' + v + '</p>');
              });
            } else {
              $('.error-message').html(xhr.responseJSON.errorMsg);
            }
          } else {
            $('.error-message').html('System error');
          }
          $('.error-message').show();
        }
      });
      return false;
    }
  };

  $.extend(loginValidationSettings, config.validations);

  $('#login-form').validate(loginValidationSettings);
})
