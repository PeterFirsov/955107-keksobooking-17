'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var PIN_OFFSET = {
    x: 20,
    y: 40
  };
  var ESC_KEYCODE = 27;
  var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin, data) {
    var pinElement = similarPinElement.cloneNode(true);
    var image = pinElement.querySelector('img');

    pinElement.addEventListener('click', function () {
      window.card.renderCards(data);

      var popup = document.querySelector('.popup');
      var close = popup.querySelector('.popup__close');

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          window.util(popup);
          window.removeEventListener('keydown', function () {});
        }
      });
      close.addEventListener('click', function () {
        window.util(popup);
        close.removeEventListener('click', function () {});
      });
    });

    pinElement.style.left = (pin.location.x - PIN_OFFSET.x) + 'px';
    pinElement.style.top = (pin.location.y - PIN_OFFSET.y) + 'px';
    image.src = pin.author.avatar;
    image.alt = pin.offer.title;

    return pinElement;
  };

  window.pin.renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i], window.massiv.firstData()[i]));
    }

    mapPins.appendChild(fragment);
  };

})();
