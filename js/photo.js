'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var fileChooserBottom = document.querySelector('.ad-form__upload input[type=file]');
  var photoList = document.querySelector('.ad-form__photo');

  fileChooserBottom.addEventListener('change', function () {
    var fileBottom = fileChooserBottom.files[0];
    var fileNameBottom = fileBottom.name.toLowerCase();

    var matchesBottom = FILE_TYPES.some(function (it) {
      return fileNameBottom.endsWith(it);
    });

    if (matchesBottom) {
      var readerBottom = new FileReader();

      readerBottom.addEventListener('load', function () {
        var previewBottom = document.createElement('img');
        previewBottom.classList.add('ad-form__photo');
        photoList.appendChild(previewBottom);
        previewBottom.src = readerBottom.result;
      });
      readerBottom.readAsDataURL(fileBottom);
    }

  });

  var clearPhoto = function () {
    preview.src = "img/muffin-grey.svg";
    var photoListOld = document.querySelectorAll('.ad-form__photo');

    for (var i = 1; i < photoListOld.length; i++) {
      photoListOld[i].remove();
    }
  };

  window.photo = {
    clear: function () {
      clearPhoto();
    }
  };

})();
