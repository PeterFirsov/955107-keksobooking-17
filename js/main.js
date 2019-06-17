'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var OBJECT_COUNT = 8;
var yLocation = {
  min: 130,
  max: 630
};

var objects = [];

var type = ['palace','flat','house','bungalo'];

var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var generateRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var addPins = function () {
  for(var i = 0; i < OBJECT_COUNT; i++) {
    objects.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type:  type[Math.floor(0 + Math.random() * type.length)]
      },
      location: {
        x: generateRandomInteger(1, map.offsetWidth),
        y: generateRandomInteger(yLocation.min, yLocation.max)
      }
    });
  }
};
addPins();

map.classList.remove('map--faded');

var renderPin = function (pin) {
  var pinElement = similarPinElement.cloneNode(true);
  var image = pinElement.querySelector('img');

  pinElement.style.left = (pin.location.x - 20) + "px";
  pinElement.style.top = (pin.location.y - 40) + "px";
  image.src = pin.author.avatar;
  image.alt = "заголовок объявления";

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPin(objects[i]));
  }

  mapPins.appendChild(fragment);
};

renderPins();
