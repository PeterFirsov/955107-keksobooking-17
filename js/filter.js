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

    var OBJECT_LIMIT = 5;

    var pinTypes = window.massiv.data().filter(function (pin) {
      if (evt.target.value === 'any') {
        return pin;
      }
      return pin.offer.type === evt.target.value;
    }).slice(0, OBJECT_LIMIT);
    window.clearPins();
    window.pin.renderPins(pinTypes);

  };

  window.filterIt = filterIt;

})();
