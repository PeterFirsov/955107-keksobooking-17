'use strict';

(function () {


  var OBJECT_LIMIT = 5;

  window.objects = [];
  window.filters = [];

  var onSuccess = function (data) {
    window.objects = data.slice();
    window.filters = data.slice(0, OBJECT_LIMIT);
  };

  window.backend.load(onSuccess, window.backend.errorHandler);

})();
