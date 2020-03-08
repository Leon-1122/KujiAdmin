//ForgotPasswordForm validation
$(function() {
  if (!$('#forgot-password-form').length) {
    return false;
  }

  var forgotPasswordValidationSettings = {
    rules: {
      emailAddress: {
        // required: true,
        email: true
      }
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
        type: 'post',
        url: '/api/v1/' + $(form).attr('action'),
        data: $(form).serialize(),
        success: function(result) {
          $('.success-message').html($.validator.messages.sendPasswordRecoverSuccess);
          $('.error-message').hide();
          $('.success-message').show();
        },
        error: function(xhr) {
          console.log(xhr);
          $('.success-message').hide();
          $('.error-message').empty();
          $('.success-message').empty();
          if(xhr.responseJSON) {
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
  }

  $.extend(forgotPasswordValidationSettings, config.validations);

  $('#forgot-password-form').validate(forgotPasswordValidationSettings);
})
