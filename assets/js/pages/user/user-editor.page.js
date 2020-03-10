//UserEditorForm validation
$(function () {
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
  };

  $.extend(userEditorValidationSettings, config.validations);

  $('#user-editor-form').validate(userEditorValidationSettings);
});
