'use strict';

(function () {
  var map = document.querySelector('.map');
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var yLocation = {
    min: 130,
    max: 630
  };
  var OBJECT_COUNT = 8;

  window.objects = [];

  var onSuccess = function (data) {
    window.objects = data.slice(0, OBJECT_COUNT);

  };

  window.backend.load(onSuccess, window.backend.errorHandler);

})();
