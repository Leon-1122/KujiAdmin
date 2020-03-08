$(function () {
  var $itemActions = $(".item-actions-dropdown");

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.item-actions-dropdown').length) {
      $itemActions.removeClass('active');
    }
  });

  $('.item-actions-toggle-btn').on('click', function (e) {
    e.preventDefault();

    var $thisActionList = $(this).closest('.item-actions-dropdown');

    $itemActions.not($thisActionList).removeClass('active');

    $thisActionList.toggleClass('active');
  });

});

function deleteCheckedUsers() {
  var userIds = '';
  $(".item input.checkbox:checked").each(function (i) {
    if (userIds.length > 0) {
      userIds += ',';
    }
    userIds += $(this).val();
  });

  if (userIds.length === 0) {
    showAlert("请选择要删除的用户");
    return;
  }

  $.ajax({
    type: 'delete',
    url: '/api/v1/user',
    data: {
      userIds: userIds
    },
    success: function (data) {
      showAlert("删除成功", function() {
        window.location = '/user/list';
      });
    },
    error: function (xhr) {
      showAlert("删除失败");
    }
  });
}

function deleteOneUser(userId) {
  $.ajax({
    type: 'delete',
    url: '/api/v1/user',
    data: {
      userIds: userId
    },
    success: function (data) {
      showAlert("删除成功", function() {
        window.location = '/user/list';
      });
    },
    error: function (xhr) {
      showAlert("删除失败");
    }
  });
}
