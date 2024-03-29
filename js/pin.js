'use strict';

(function () {
  var PIN_OFFSET = {
    x: 20,
    y: 40
  };
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = similarPinElement.cloneNode(true);
    var image = pinElement.querySelector('img');


    pinElement.addEventListener('click', function () {
      var pins = document.querySelectorAll('.map__pin');
      pins.forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
      window.card.clearPopup();
      window.card.renderCards(pin);
      pinElement.classList.add('map__pin--active');
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
      fragment.appendChild(renderPin(array[i]));
    }

    mapPins.appendChild(fragment);
  };

})();
