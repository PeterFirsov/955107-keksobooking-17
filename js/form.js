'use strict';

(function () {
  var ROOMS = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var types = {
    palace: {
      ru: 'Дворец',
      min: 10000
    },
    flat: {
      ru: 'Квартира',
      min: 1000
    },
    house: {
      ru: 'Дом',
      min: 5000
    },
    bungalo: {
      ru: 'Бунгало',
      min: 0
    }
  };

  var form = document.querySelector('.notice');
  var fadeForm = form.querySelector('.ad-form');
  var formType = fadeForm.querySelector('select[name=type]');
  var formPrice = fadeForm.querySelector('input[name=price]');
  var formIn = fadeForm.querySelector('select[name=timein]');
  var formOut = fadeForm.querySelector('select[name=timeout]');
  var formRoom = fadeForm.querySelector('select[name=rooms]');
  var formCapacity = fadeForm.querySelector('select[name=capacity]');
  var capacityOptions = formCapacity.options;
  var reset = fadeForm.querySelector('.ad-form__reset');

  var removeAttribute = function () {
    [].forEach.call(capacityOptions, function (item) {
      item.disabled = false;
    });
  };

  var attributeChange = function () {
    [].forEach.call(formCapacity.options, function (item) {
      item.selected = (ROOMS[formRoom.value][0] === item.value);
      item.disabled = !(ROOMS[formRoom.value].indexOf(item.value) >= 0);
    });
  };

  attributeChange();

  formRoom.addEventListener('change', function () {
    removeAttribute();
    attributeChange();
  });


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

  reset.addEventListener('click', function (evt) {
    fadeForm.reset();
    window.map.disable(true);
    window.filter.clearPins();
    window.card.clearPopup();
    window.photo.clear();
    evt.preventDefault();
  });

  fadeForm.addEventListener('submit', function (evt) {
    window.backend.load(function () {
      fadeForm.reset();
      window.map.disable(true);
      window.filter.clearPins();
      window.card.clearPopup();
      window.backend.successHandler();
      window.photo.clear();
    }, window.backend.errorHandler, new FormData(fadeForm));
    evt.preventDefault();
  });

})();
