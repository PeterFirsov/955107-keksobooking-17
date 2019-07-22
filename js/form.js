'use strict';

(function () {
  var types = {
    palace: {
      ru: 'Дворец', min: 10000
    },
    flat: {
      ru: 'Квартира', min: 1000
    },
    house: {
      ru: 'Дом', min: 5000
    },
    bungalo: {
      ru: 'Бунгало', min: 0
    }
  };

  var form = document.querySelector('.notice');
  var fadeForm = form.querySelector('.ad-form');
  var formType = fadeForm.querySelector('select[name=type]');
  var formPrice = fadeForm.querySelector('input[name=price]');
  var formIn = fadeForm.querySelector('select[name=timein]');
  var formOut = fadeForm.querySelector('select[name=timeout]');

  formType.addEventListener('change', function (evt) {
    formPrice.min = types[evt.target.value].min;
    formPrice.placeholder = types[evt.target.value].min;
    window.filterIt(evt);
  });

  formIn.addEventListener('change', function () {
    formOut.value = formIn.value;
  });

  formOut.addEventListener('change', function () {
    formIn.value = formOut.value;
  });

})();
