'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var OBJECT_COUNT = 8;
var PIN_HALF_WIDTH = 31;
var PIN_FULL_HEIGHT = 84;
var MAP_BORDER_TOP = 45;
var MAP_BORDER_BOTTOM = 73;

var PIN_OFFSET = {
  x: 20,
  y: 40
};

var yLocation = {
  min: 130,
  max: 630
};

var objects = [];

var type = ['palace', 'flat', 'house', 'bungalo'];

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

  pinElement.style.left = (pin.location.x - PIN_OFFSET.x) + 'px';
  pinElement.style.top = (pin.location.y - PIN_OFFSET.y) + 'px';
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

var setCordinate = function (xCord, yCord) {
  var compliteCordinate = xCord + ', ' + yCord;
  cordinateInput.value = compliteCordinate;
};
setCordinate(pinCordinateLeft + PIN_HALF_WIDTH, pinCordinateTop + PIN_FULL_HEIGHT);

var disableForm = function (first) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = first;
  }
};
disableForm(true);

var activateMap = function () {
  map.classList.remove('map--faded');
  fadeForm.classList.remove('ad-form--disabled');
  disableForm(false);
};

// для перемещения
var onMainPinMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (mapPins.offsetWidth - PIN_HALF_WIDTH > mapPinMain.offsetLeft - shift.x && mapPins.offsetHeight - PIN_FULL_HEIGHT - MAP_BORDER_BOTTOM > mapPinMain.offsetTop - shift.y) {
      if (mapPinMain.offsetLeft - shift.x > mapPins.offsetLeft - PIN_HALF_WIDTH && mapPinMain.offsetTop - shift.y > mapPins.offsetTop + MAP_BORDER_TOP) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
    }

    setCordinate(parseInt(mapPinMain.style.left, 10) + PIN_HALF_WIDTH, parseInt(mapPinMain.style.top, 10) + PIN_FULL_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

var onMainPinMouseUp = function () {
  activateMap();
  addPins();
  renderPins();

  mapPinMain.removeEventListener('mouseup', onMainPinMouseUp);
};

mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
