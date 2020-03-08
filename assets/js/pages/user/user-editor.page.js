//UserEditorForm validation
$(function() {
  if (!$('#user-editor-form').length) {
    return false;
  }

  var userEditorValidationSettings = {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      fullName: "required",
      role: "required",
    },
    // submit handler
    submitHandler: function(form) {
      $.ajax({
        type: 'put',
        url: '/api/v1/' + $(form).attr('action'),
        data: $(form).serialize(),
        success: function(data) {
          console.log(data);
          $('.error-message').hide();
          window.location = '/user/list';
        },
        error: function(xhr) {
          console.log(xhr);
          if (xhr.responseJSON) {
            $('.error-message').html(xhr.responseJSON.errorMsg);
          } else {
            $('.error-message').html('System error');
          }
          $('.error-message').show();
        }
      });
      return false;
    }
  }

  $.extend(userEditorValidationSettings, config.validations);

  $('#user-editor-form').validate(userEditorValidationSettings);
})
