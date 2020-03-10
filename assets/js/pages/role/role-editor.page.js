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
  };

  $.extend(roleEditorValidationSettings, config.validations);

  $('#role-editor-form').validate(roleEditorValidationSettings);
});
