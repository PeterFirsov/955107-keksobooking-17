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
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var form = document.querySelector('.notice');
  var fadeForm = form.querySelector('.ad-form');
  var pinCordinateLeft = parseInt(mapPins.querySelector('.map__pin').style.left, 10);
  var pinCordinateTop = parseInt(mapPins.querySelector('.map__pin').style.top, 10);
  var cordinateInput = form.querySelector('input[name=address]');
  var formType = fadeForm.querySelector('select[name=type]');
  var formPrice = fadeForm.querySelector('input[name=price]');
  var formIn = fadeForm.querySelector('select[name=timein]');
  var formOut = fadeForm.querySelector('select[name=timeout]');

  formType.addEventListener('change', function (evt) {
    formPrice.min = types[evt.target.value].min;
    formPrice.placeholder = types[evt.target.value].min;
  });

  formIn.addEventListener('change', function () {
    formOut.value = formIn.value;
  });

  formOut.addEventListener('change', function () {
    formIn.value = formOut.value;
  });

})();
