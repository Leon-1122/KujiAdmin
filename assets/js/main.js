$(function () {
  /***********************************************
   *        actions dropdown setting
   ***********************************************/
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

  /***********************************************
   *        table select all checkbox setting
   ***********************************************/
  $('#select-all-items').on('change', function () {
    var $this = $(this).children(':checkbox').get(0);
    $(this).parents('li')
      .siblings()
      .find(':checkbox')
      .prop('checked', $this.checked)
      .change();
  });

  setSameHeights();

  var resizeTimer;

  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setSameHeights, 150);
  });

  /***********************************************
   *        sidebar setting
   ***********************************************/
  $('#sidebar-menu').metisMenu({
    activeClass: 'open'
  });

  $('#sidebar-collapse-btn').on('click', function (event) {
    event.preventDefault();

    $("#app").toggleClass("sidebar-open");
  });

  $("#sidebar-overlay").on('click', function () {
    $("#app").removeClass("sidebar-open");
  });

  if ($.browser.mobile) {
    var $appContainer = $('#app ');
    var $mobileHandle = $('#sidebar-mobile-menu-handle ');

    $mobileHandle.swipe({
      swipeLeft: function () {
        if ($appContainer.hasClass("sidebar-open")) {
          $appContainer.removeClass("sidebar-open");
        }
      },
      swipeRight: function () {
        if (!$appContainer.hasClass("sidebar-open")) {
          $appContainer.addClass("sidebar-open");
        }
      },
      // excludedElements: "button, input, select, textarea, .noSwipe, table",
      triggerOnTouchEnd: false
    });
  }

  /***********************************************
   *        conform modal setting
   ***********************************************/
  $('#confirm-modal').on('show.bs.modal', function (e) {
    var target = $(e.relatedTarget);
    var callback = target.data('callback');
    if (callback) {
      $('#confirm-ok').one('click', function () {
        eval(callback)
      });
    }
  });

  $("body").addClass("loaded");

});


function setSameHeights($container) {

  $container = $container || $('.sameheight-container');

  var viewport = ResponsiveBootstrapToolkit.current();

  $container.each(function () {

    var $items = $(this).find(".sameheight-item");

    // Get max height of items in container
    var maxHeight = 0;

    $items.each(function () {
      $(this).css({height: 'auto'});
      maxHeight = Math.max(maxHeight, $(this).innerHeight());
    });


    // Set heights of items
    $items.each(function () {
      // Ignored viewports for item
      var excludedStr = $(this).data('exclude') || '';
      var excluded = excludedStr.split(',');

      // Set height of element if it's not excluded on
      if (excluded.indexOf(viewport) === -1) {
        $(this).innerHeight(maxHeight);
      }
    });
  });
}


/***********************************************
 *        Animation Settings
 ***********************************************/
function animate(options) {
  var animationName = "animated " + options.name;
  var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
  $(options.selector)
    .addClass(animationName)
    .one(animationEnd,
      function () {
        $(this).removeClass(animationName);
      }
    );
}

/***********************************************
 *        NProgress Settings
 ***********************************************/
var npSettings = {
  easing: 'ease',
  speed: 500
}

NProgress.configure(npSettings);

// start load bar
NProgress.start();

// end loading bar
NProgress.done();

/***********************************************
 *        table pager
 ***********************************************/
function doPage(formName, pageNum) {
  var $formObj = $('#' + formName + '-form')
  if ($formObj.length) {
    $formObj.attr('action', $formObj.attr('action') + '/' + pageNum);
    $formObj.submit();
  }
}

/***********************************************
 *        message display
 ***********************************************/
function showAlert(msg, callback) {
  $('#alert-modal .modal-body p').text(msg);
  if (callback && $.isFunction(callback)) {
    $('#alert-close').one('click', callback);
  }
  $('#alert-modal').modal({backdrop: 'static'});
}

/***********************************************
 *        delete data
 ***********************************************/
function deleteCheckedRecords(module) {
  var ids = [];
  $(".item input.checkbox:checked").each(function (i) {
    ids.push($(this).val());
  });

  if (ids.length === 0) {
    showAlert("请选择要删除的数据");
    return;
  }

  $.ajax({
    type: 'delete',
    url: '/api/v1/' + module,
    data: {
      ids: ids
    },
    success: function (data) {
      showAlert("删除成功", function () {
        window.location = '/' + module + '/list';
      });
    },
    error: function (xhr) {
      showAlert("删除失败");
    }
  });
}

function deleteOneRecord(module, id) {
  $.ajax({
    type: 'delete',
    url: '/api/v1/' + module,
    data: {
      ids: [id]
    },
    success: function (data) {
      showAlert("删除成功", function () {
        window.location = '/' + module + '/list';
      });
    },
    error: function (xhr) {
      showAlert("删除失败");
    }
  });
}

