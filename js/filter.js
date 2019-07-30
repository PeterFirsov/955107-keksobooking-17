'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var clearPins = function () {
  var offers = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    offers.forEach(function (offer) {
      offer.remove();
    });
  };


  var filterIt = function (evt) {

    var OBJECT_LIMIT = 5;

    var pinTypes = window.massiv.data().filter(function (pin) {
      if (evt.target.value === 'any') {
        return pin;
      }
      return pin.offer.type === evt.target.value;
    }).slice(0, OBJECT_LIMIT);
    clearPins();
    window.pin.renderPins(pinTypes);

  };

  window.filter = {
    filterIt: filterIt,
    clearPins: clearPins
  };

})();
