'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var PIN_OFFSET = {
    x: 20,
    y: 40
  };
  var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = similarPinElement.cloneNode(true);
    var image = pinElement.querySelector('img');

    pinElement.style.left = (pin.location.x - PIN_OFFSET.x) + 'px';
    pinElement.style.top = (pin.location.y - PIN_OFFSET.y) + 'px';
    image.src = pin.author.avatar;
    image.alt = 'заголовок объявления';

    return pinElement;
  };

  window.pin.renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.objects.length; i++) {
      fragment.appendChild(renderPin(window.objects[i]));
    }

    mapPins.appendChild(fragment);
  };

})();
