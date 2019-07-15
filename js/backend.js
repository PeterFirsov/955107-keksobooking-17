'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';


  var request = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var goodAnswer = 200;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === goodAnswer) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var node = document.querySelector('#error')
      .content
      .querySelector('.error');

  var main = document.querySelector('main');

  var errorHandler = function () {
    var error = node.cloneNode(true);
    main.appendChild(error);
  };

  window.backend = {
    load: function (onLoad, onError) {
      request(onLoad, onError);
    },
    errorHandler: errorHandler
  };

})();
