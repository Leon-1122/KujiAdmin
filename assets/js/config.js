var config = window.config = {};

// Prevent double-posting
var syncing = false;

// product modal trigger target
var productTarget = null;

// Config dropzone
var mediaTarget = null;
Dropzone.options.dropzoneUpload = {
  paramName: 'file', // The name that will be used to transfer the file
  maxFilesize: 3, // MB
  maxFiles: 1,
  acceptedFiles: 'image/*',
  addRemoveLinks: true,
  dictDefaultMessage: '拖动文件到此处或单击选择文件上传',
  dictInvalidFileType: '不支持该文件格式',
  dictCancelUpload: '取消上传',
  dictRemoveFile: '删除',
  success: function (file, response, e) {
    console.log(file);
    // 添加图片id和访问url
    file.id = response.id;
    file.imageSrc = response.imageSrc;
  },
  maxfilesexceeded: function (file) {
    console.log(file);
    this.removeFile(file);
    showAlert('超过上传文件最大数量，请移除后重新上传');
  },
  removedfile: async function (file) {
    // // 删除服务器上的文件
    // if (file.id && file.imageSrc) {
    //   await Cloud['deletePicture'].with({id: file.id});
    // }
    if (file.previewElement != null && file.previewElement.parentNode != null) {
      file.previewElement.parentNode.removeChild(file.previewElement);
    }
  }
};


// Config reference element
var $ref = $("#ref");

// Configure responsive bootstrap toolkit
config.ResponsiveBootstrapToolkitVisibilityDivs = {
  'xs': $('<div class="device-xs 				  hidden-sm-up"></div>'),
  'sm': $('<div class="device-sm hidden-xs-down hidden-md-up"></div>'),
  'md': $('<div class="device-md hidden-sm-down hidden-lg-up"></div>'),
  'lg': $('<div class="device-lg hidden-md-down hidden-xl-up"></div>'),
  'xl': $('<div class="device-xl hidden-lg-down			  "></div>'),
};

ResponsiveBootstrapToolkit.use('Custom', config.ResponsiveBootstrapToolkitVisibilityDivs);

// validation configuration
config.validations = {
  debug: false,
  errorClass: 'has-error',
  validClass: 'success',
  errorElement: "span",

  // add error class
  highlight: function (element, errorClass, validClass) {
    $(element).parents("div.form-group")
      .addClass(errorClass)
      .removeClass(validClass);
  },

  // add error class
  unhighlight: function (element, errorClass, validClass) {
    $(element).parents(".has-error")
      .removeClass(errorClass)
      .addClass(validClass);
  },

  // submit handler
  submitHandler: async function (form) {
    if (syncing) {
      return;
    }

    $('#loading').show();
    syncing = true;
    if (this.settings.beforeSubmit && $.isFunction(this.settings.beforeSubmit)) {
      this.settings.beforeSubmit.call(this, form);
    }

    var errorMsg = '', $errorContent = $('.error-message'), $successContent = $('.success-message');
    var result = await Cloud[$(form).data('action')].with($(form).parseForm())
      .tolerate((err) => {
        var responseInfo = err.responseInfo;
        if (responseInfo.data.errorMsg) {
          errorMsg = responseInfo.data.errorMsg;
        } else {
          errorMsg = $.validator.messages.badRequest;
        }
      });

    if ($errorContent) {
      $errorContent.hide();
    }

    if ($successContent) {
      $successContent.hide();
    }

    syncing = false;

    if (result) {
      var redirect = $(form).data('redirect');
      if (redirect) {
        syncing = true;
        window.location = $(form).data('redirect');
      } else {
        $('#loading').hide();
        if ($successContent) {
          $successContent.html($.validator.messages.operationSuccess);
          $successContent.show();
        }
      }
    } else {
      $('#loading').hide();
      if ($errorContent) {
        $errorContent.html(errorMsg);
        $errorContent.show();
      }
    }

  }
};

// delay time configuration
config.delayTime = 50;

// chart configurations
config.chart = {};

config.chart.colorPrimary = tinycolor($ref.find(".chart .color-primary").css("color"));
config.chart.colorSecondary = tinycolor($ref.find(".chart .color-secondary").css("color"));

// form's inputs serialize to object
(function ($) {
  $.fn.parseForm = function () {
    var serializeObj = {};
    var array = this.serializeArray();
    var str = this.serialize();
    $(array).each(function () {
      if (serializeObj[this.name]) {
        if ($.isArray(serializeObj[this.name])) {
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        serializeObj[this.name] = this.value;
      }
    });
    return serializeObj;
  };
})(jQuery);

String.prototype.firstUpperCase = function () {
  return this.replace(/^\S/, function (s) {
    return s.toUpperCase();
  });
};

// img lazyload
var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});
