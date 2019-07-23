'use strict';

(function () {

  var OBJECT_LIMIT = 5;

  var objects = [];
  var filters = [];

  var onSuccess = function (data) {
    objects = data.slice();
    filters = data.slice(0, OBJECT_LIMIT);
  };

  window.backend.load(onSuccess, window.backend.errorHandler);

  window.massiv = {
    data: function () {
      return objects;
    },
    firstData: function () {
      return filters;
    }
  };

})();
