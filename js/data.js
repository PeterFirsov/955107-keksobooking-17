'use strict';

(function () {
  var map = document.querySelector('.map');
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var yLocation = {
    min: 130,
    max: 630
  };
  var OBJECT_COUNT = 8;

  var generateRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.objects = [];

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
  addPins();

})();
