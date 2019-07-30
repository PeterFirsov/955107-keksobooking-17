'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var GOOD_ANSWER = 200;

  var request = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var goodAnswer = GOOD_ANSWER;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === goodAnswer) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    if (data) {
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    } else {
      xhr.open('GET', LOAD_URL);
      xhr.send();
    }
  };

  var node = document.querySelector('#error')
    .content
    .querySelector('.error');

  var main = document.querySelector('main');

  var clearPage = function () {
    main.lastChild.remove();
  };

  var errorHandler = function () {
    var error = node.cloneNode(true);
    main.appendChild(error);
    var massage = document.querySelector('.error');
    var errorButton = massage.querySelector('.error__button')
    errorButton.addEventListener('click', function (evt) {
      window.util.isEscEvent(evt, clearPage);
    });
    massage.addEventListener('click', function (evt) {
      window.util.isEscEvent(evt, clearPage);
    });
    window.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, clearPage);
    });
  };

  var successMassage = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successHandler = function () {
    var success = successMassage.cloneNode(true);
    main.appendChild(success);
    var massage = document.querySelector('.success');
    massage.addEventListener('click', function (evt) {
      window.util.isEscEvent(evt, clearPage);
    });
    window.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, clearPage);
    });
  };

  window.backend = {
    load: function (onLoad, onError, data) {
      request(onLoad, onError, data);
    },
    errorHandler: errorHandler,
    successHandler: successHandler,
  };

})();
