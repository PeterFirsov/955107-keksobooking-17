'use strict';

(function () {

  var filterIt = function (evt) {

    var pinTypes = window.objects.filter(function (pin) {
      return pin.offer.type === evt.target.value;
    }).slice(0,5);
    window.clearPins();
    window.pin.renderPins(pinTypes);

  };

  window.filterIt = filterIt;

})();
