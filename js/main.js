'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var OBJECT_COUNT = 8;
var yLocation = {
  min: 130,
  max: 630
};

var objects = [];

var type = ['palace', 'flat', 'house', 'bungalo'];

var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var generateRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var addPins = function () {
  for (var i = 0; i < OBJECT_COUNT; i++) {
    objects.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: type[Math.floor(0 + Math.random() * type.length)]
      },
      location: {
        x: generateRandomInteger(1, map.offsetWidth),
        y: generateRandomInteger(yLocation.min, yLocation.max)
      }
    });
  }
};

var renderPin = function (pin) {
  var pinElement = similarPinElement.cloneNode(true);
  var image = pinElement.querySelector('img');

  pinElement.style.left = (pin.location.x - 20) + 'px';
  pinElement.style.top = (pin.location.y - 40) + 'px';
  image.src = pin.author.avatar;
  image.alt = 'заголовок объявления';

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPin(objects[i]));
  }

  mapPins.appendChild(fragment);
};

var form = document.querySelector('.notice');
var formFields = form.getElementsByTagName('fieldset');
var fadeForm = form.querySelector('.ad-form');
var pinCordinateLeft = parseInt(mapPins.querySelector('.map__pin').style.left, 10);
var pinCordinateTop = parseInt(mapPins.querySelector('.map__pin').style.top, 10);
var cordinateInput = form.querySelector('input[name=address]');
var no = false;
var yes = true;
var formType = fadeForm.querySelector('select[name=type]');
var formPrice = fadeForm.querySelector('input[name=price]');
var formIn = fadeForm.querySelector('select[name=timein]');
var formOut = fadeForm.querySelector('select[name=timeout]');

formType.addEventListener('input', function () {
  switch (formType.value) {
    case 'bungalo' :
      formPrice.setAttribute('minlength', 0);
      formPrice.placeholder = '0';
      break;
    case 'flat' :
      formPrice.setAttribute('minlength', 1000);
      formPrice.placeholder = '1000';
      break;
    case 'house' :
      formPrice.setAttribute('minlength', 5000);
      formPrice.placeholder = '5000';
      break;
    case 'palace' :
      formPrice.setAttribute('minlength', 10000);
      formPrice.placeholder = '10000';
      break;
  }
});

formIn.addEventListener('input', function () {
  switch (formIn.value) {
    case '12:00' :
      formOut.value = '12:00';
      break;
    case '13:00' :
      formOut.value = '13:00';
      break;
    case '14:00' :
      formOut.value = '14:00';
      break;
  }
});

var setCordinate = function (xCord, yCord) {
  var compliteCordinate = xCord + ', ' + yCord;
  cordinateInput.setAttribute('value', compliteCordinate);
};
setCordinate(pinCordinateLeft +31, pinCordinateTop + 84);

var disableForm = function (first) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = first;
  }
};
disableForm(yes);


//для перемещения

var setEvent = function (toggle, element) {
  toggle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    fadeForm.classList.remove('ad-form--disabled');
    disableForm(no);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      element.style.top = (element.offsetTop - shift.y) + 'px';
      element.style.left = (element.offsetLeft - shift.x) + 'px';

      setCordinate(parseInt(element.style.left, 10) + 31, parseInt(element.style.top, 10) + 84);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addPins();
      renderPins();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        // eslint-disable-next-line no-shadow
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          toggle.removeEventListener('click', onClickPreventDefault);
        };
        toggle.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};
setEvent(mapPinMain, mapPinMain);
