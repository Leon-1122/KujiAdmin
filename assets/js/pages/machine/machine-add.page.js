//MachineAddForm validation
$(function () {
  if (!$('#machine-add-form').length) {
    return false;
  }

  $('#getMachineInfo').click(async function () {
    if ($('#machineIds').val().length === 0) {
      showAlert($.validator.messages.needMachineId);
      return;
    }

    $('#loading').show();

    var result = await Cloud['addMachine'].with({machineIds: $('#machineIds').val()})
      .tolerate((err) => {
        console.log(err);
      });

    $('#loading').hide();

    if (result && result.data) {
      var content = '';
      result.data.forEach(function (v) {
        content += `<p>${v.item}: ${v.msg}</p>`;
      });
      showSuccessMsg(content);
    } else {
      showErrorMsg(`<p>${$.validator.messages.badRequest}</p>`);
    }

  });
});
