//LotteryEditorForm validation
$(function () {
  if (!$('#lottery-editor-form').length) {
    return false;
  }

  baguetteBox.run('.images-container');

  $('.image-container .controls .control-btn.upload').on('click', function (e) {
    mediaTarget = $(e.currentTarget);
    $('#modal-media').modal();
    return false;
  })
});
