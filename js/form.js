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
  var formRoom = fadeForm.querySelector('select[name=rooms]');
  var formCapacity = fadeForm.querySelector('select[name=capacity]');
  var capacityOptions = formCapacity.options;

  var removeAttribute = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].removeAttribute('disabled');
    }
  };

<<<<<<< HEAD
  var attributeChange = function () {
    [].forEach.call(formCapacity.options, function (item) {
      item.selected = (ROOMS[formRoom.value][0] === item.value);
      item.disabled = !(ROOMS[formRoom.value].indexOf(item.value) >= 0);
    });
=======
  var attributeChange = function (evt) {
    switch (formRoom.value || evt.target.value) {
      case '1':
        capacityOptions[0].setAttribute('disabled', 'disabled');
        capacityOptions[1].setAttribute('disabled', 'disabled');
        formCapacity.value = '1';
        break;
      case '2':
        capacityOptions[0].setAttribute('disabled', 'disabled');
        formCapacity.value = '2';
        break;
    }
>>>>>>> ff80901c2dd760c755389de3238881fb48e1a8f6
  };

  attributeChange();

<<<<<<< HEAD
  formRoom.addEventListener('change', function () {
    removeAttribute();
    attributeChange();
=======
  formRoom.addEventListener('change', function (evt) {
    removeAttribute();
    attributeChange(evt);
>>>>>>> ff80901c2dd760c755389de3238881fb48e1a8f6
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

})();
