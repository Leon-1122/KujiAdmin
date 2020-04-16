//PasswordEditorForm validation
$(function () {
  if (!$('#password-editor-form').length) {
    return false;
  }

  var passwordEditorValidationSettings = {
    rules: {
      oldPassword: "required",
      newPassword: "required",
      confirmPassword: "required",
    },
  };

  $.extend(passwordEditorValidationSettings, config.validations);

  $('#password-editor-form').validate(passwordEditorValidationSettings);
});
