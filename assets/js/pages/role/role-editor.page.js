//RoleEditorForm validation
$(function () {
  if (!$('#role-editor-form').length) {
    return false;
  }

  var roleEditorValidationSettings = {
    rules: {
      code: "required",
      desc: "required"
    },
    // submit handler
    submitHandler: function (form) {
      $.ajax({
        type: 'put',
        url: '/api/v1/role',
        data: $(form).serialize(),
        success: function (data) {
          console.log(data);
          $('.error-message').hide();
          window.location = '/role/list';
        },
        error: function (xhr) {
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

  $.extend(roleEditorValidationSettings, config.validations);

  $('#role-editor-form').validate(roleEditorValidationSettings);
})
