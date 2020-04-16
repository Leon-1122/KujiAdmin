//ProfileEditorForm validation
$(function () {
  if (!$('#profile-editor-form').length) {
    return false;
  }

  var profileEditorValidationSettings = {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      fullName: "required",
    },
  };

  $.extend(profileEditorValidationSettings, config.validations);

  $('#profile-editor-form').validate(profileEditorValidationSettings);
});
