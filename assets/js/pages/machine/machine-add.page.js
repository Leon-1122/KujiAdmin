//MachineAddForm validation
$(function () {
  if (!$('#machine-add-form').length) {
    return false;
  }

  $('#getMachineInfo').click(async function () {
    if ($('#machineIds').val().length === 0) {
      showAlert("请输入机器ID");
      return;
    }
    var result = await Cloud['addMachine'].with({machineIds: $('#machineIds').val()})
      .tolerate((err) => {
        console.log(err);
      });

    // TODO show result
    if (result) {

    } else {

    }

  });
});
