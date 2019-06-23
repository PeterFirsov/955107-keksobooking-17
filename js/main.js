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
var pinCordinateLeft = mapPins.querySelector('.map__pin').style.left.replace(/[^0-9]/g, '');
var pinCordinateTop = mapPins.querySelector('.map__pin').style.top.replace(/[^0-9]/g, '');
var compliteCordinate = pinCordinateLeft + '.' + pinCordinateTop;
var cordinateInput = form.querySelector('input[name=address]');
var able = false;
var disable = true;

var setCordinate = function () {
  cordinateInput.setAttribute('value', compliteCordinate);
};
setCordinate();

var disableForm = function (able, disable) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = able || disable;
  }
};
disableForm(disable);

mapPinMain.addEventListener('click', function () {
  map.classList.remove('map--faded');
  fadeForm.classList.remove('ad-form--disabled');
  addPins();
  renderPins();
  disableForm(able);
});

mapPinMain.addEventListener('mouseup', function () {
  setCordinate();
});
