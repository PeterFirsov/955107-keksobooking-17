'use strict';

(function () {

  var OBJECT_COUNT = 8;

  window.objects = [];

  var onSuccess = function (data) {
    window.objects = data.slice(0, OBJECT_COUNT);

  };

  window.backend.load(onSuccess, window.backend.errorHandler);

})();
