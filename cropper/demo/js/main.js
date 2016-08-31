$(function () {

  'use strict';
    var console = window.console || { log: function () {} };
     window.$image = $('#image');
    
    var options = {
          // aspectRatio: 16 / 9
        };


    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();


    // Cropper
    $image.cropper(options);


    // Buttons
    if (!$.isFunction(document.createElement('canvas').getContext)) {
      $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }



    // Import image
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
      $inputImage.change(function () {
        var files = this.files;
        var file;

        if (!$image.data('cropper')) {
          return;
        }

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            blobURL = URL.createObjectURL(file);
            $image.one('built.cropper', function () {

              // Revoke when load complete
              URL.revokeObjectURL(blobURL);
            }).cropper('reset').cropper('replace', blobURL);
            $inputImage.val('');
          } else {
            window.alert('Please choose an image file.');
          }
        }
      });
    } else {
      $inputImage.prop('disabled', true).parent().addClass('disabled');
    }
});


function cro($el){
  var $canvas = $el;
// Methods
    $('.docs-buttons').on('click', '[data-method]', function () {
      var $this = $(this);
      var data = $this.data();
      var $target;
      var result;

      if ($this.prop('disabled') || $this.hasClass('disabled')) {
        return;
      }

      if ($image.data('cropper') && data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        if (data.method === 'rotate') {
          $image.cropper('clear');
        }

        result = $image.cropper(data.method, data.option, data.secondOption);

        if (data.method === 'rotate') {
          $image.cropper('crop');
        }

        switch (data.method) {
          case 'scaleX':
          case 'scaleY':
            $(this).data('option', -data.option);
            break;

          case 'getCroppedCanvas':
            if (result) {

              // Bootstrap's Modal
              // $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
              // $('#getCroppedCanvasModal').html(result);
              $el.html(result);
              $('.docs-buttons').unbind('click');
            }

            break;
        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    });
    
  }



