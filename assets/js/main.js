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

  /***********************************************
   *        media modal setting
   ***********************************************/
  $('#modal-media').on('hide.bs.modal', function (e) {
    Dropzone.forElement("#dropzone-upload").removeAllFiles();
  });
  $('#media-ok').on('click', function () {
    var files = Dropzone.forElement("#dropzone-upload").getAcceptedFiles();
    if (files && files.length > 0) {
      var imageSrc = files[0].imageSrc;
      if (mediaTarget) {
        var parent = mediaTarget.parents('.images-container');
        parent.find('a').attr('href', imageSrc);
        parent.find('input[type=hidden]').val(imageSrc);
        parent.find('.image').css('backgroundImage', `url('${imageSrc}')`);
      }
    }
    $('#modal-media').modal('hide');
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
  var $formObj = $('#' + formName + '-form');
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
 *        delete records
 ***********************************************/
function deleteCheckedRecords(module, redirect) {
  var ids = [];
  $(".item:not(.item-list-header) input.checkbox:checked").each(function (i) {
    ids.push($(this).val());
  });

  if (ids.length === 0) {
    showAlert($.validator.messages.selectDeleteRecords);
    return;
  }

  deleteRecord(module, ids, redirect);
}

function deleteOneRecord(module, id, redirect) {
  var ids = [id];
  deleteRecord(module, ids, redirect);
}

async function deleteRecord(module, ids, redirect) {
  var result = await Cloud['delete' + module.firstUpperCase()].with({ids: ids})
    .tolerate((err) => {
      console.log(err);
    });

  if (result) {
    showAlert($.validator.messages.deleteSuccess, function () {
      if (redirect) {
        window.location = redirect;
      } else {
        window.location = '/' + module + '/list';
      }

    });
  } else {
    showAlert($.validator.messages.deleteFailed);
  }
}

/***********************************************
 *        product modal
 ***********************************************/
function doAjaxPage(pageNum) {
  $.ajax({
    url: '/lottery/product',
    data: {
      searchFor: $('#searchFor').val(),
      pageNum: pageNum || 1
    },
    success: function (result) {
      var doc = $(result);
      $('#modal-product').html($(doc[0]).html());
    }
  });
}

function initProductModal(target) {
  $.ajax({
    url: '/lottery/product',
    success: function (result) {
      $('#modal-product-container').html(result);
      productTarget = target;
      $('#modal-product').modal({backdrop: 'static'});
    }
  });
}

/***********************************************
 *        take out product
 ***********************************************/
function takeOutCheckedProducts() {
  var machineId = '';
  var items = [];
  $(".item:not(.item-list-header) input.checkbox:checked").each(function (i, e) {
    var $selectedRow = $(e).parents('.item-row');
    var selectedMachineId = $selectedRow.find('.machineId').text();
    var selectedSku = $(e).find('.sku').text();
    var selectedName = $(e).find('.name').text();

    if (machineId !== '' && machineId !== selectedMachineId) {
      showAlert($.validator.messages.tooManyMachines);
      return;
    }

    machineId = selectedMachineId;
    items.push({sku: selectedSku, count: 1, name: selectedName});
  });

  if (items.length === 0) {
    showAlert($.validator.messages.selectTakeOutProducts);
    return;
  }

  takeOutProduct(machineId, items);
}

function takeOutOneProduct(machineId, sku, name) {
  var items = [{sku: sku, count: 1, name: name}];
  takeOutProduct(machineId, items);
}

async function takeOutProduct(machineId, items) {
  var result = await Cloud['takeOutProduct'].with({machineId: machineId, items: items})
    .tolerate((err) => {
      console.log(err);
    });

  if (result) {
    showAlert($.validator.messages.takeOutSuccess, function () {
      window.location = '/machine/stock';
    });
  } else {
    showAlert($.validator.messages.takeOutFailed);
  }
}


/***********************************************
 *        active machine lottery
 ***********************************************/
function activeCheckedMachineLotteries() {
  var ids = [];
  $(".item:not(.item-list-header) input.checkbox:checked").each(function (i, e) {
    ids.push($(this).val());
  });

  if (ids.length === 0) {
    showAlert($.validator.messages.selectMachineLottery);
    return;
  }

  activeMachineLottery(ids);
}

function activeOneMachineLottery(id) {
  var ids = [id];
  activeMachineLottery(ids);
}

async function activeMachineLottery(ids) {
  var result = await Cloud['activeMachineLottery'].with({ids: ids})
    .tolerate((err) => {
      console.log(err);
    });

  if (result) {
    showAlert($.validator.messages.activeSuccess, function () {
      window.location = '/machine/lottery';
    });
  } else {
    showAlert($.validator.messages.activeFailed);
  }
}
