'use strict';

(function () {

  var filterIt = function (evt) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelector('.map__pins');
    var offers = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    var clearPins = function () {
      offers.forEach(function (offer) {
        offer.remove();
      });
    };

    window.clearPins = clearPins;

    var pinTypes = window.objects.filter(function (pin) {
      return pin.offer.type === evt.target.value;
    }).slice(0, 5);
    window.clearPins();
    window.pin.renderPins(pinTypes);

  };

  window.filterIt = filterIt;

})();
