'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var PIN_HALF_WIDTH = 31;
  var PIN_FULL_HEIGHT = 84;
  var MAP_BORDER_TOP = 45;
  var MAP_BORDER_BOTTOM = 73;
  var pinCordinateLeft = parseInt(mapPins.querySelector('.map__pin').style.left, 10);
  var pinCordinateTop = parseInt(mapPins.querySelector('.map__pin').style.top, 10);
  var form = document.querySelector('.notice');
  var formFields = form.getElementsByTagName('fieldset');
  var cordinateInput = form.querySelector('input[name=address]');
  var fadeForm = form.querySelector('.ad-form');

  var setCordinate = function (xCord, yCord) {
    var compliteCordinate = xCord + ', ' + yCord;
    cordinateInput.value = compliteCordinate;
  };
  setCordinate(pinCordinateLeft + PIN_HALF_WIDTH, pinCordinateTop + PIN_FULL_HEIGHT);

  var disableForm = function (first) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = first;
    }
  };
  disableForm(true);

  var activateMap = function () {
    map.classList.remove('map--faded');
    fadeForm.classList.remove('ad-form--disabled');
    disableForm(false);
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPins.offsetWidth - PIN_HALF_WIDTH > mapPinMain.offsetLeft - shift.x && mapPins.offsetHeight - PIN_FULL_HEIGHT - MAP_BORDER_BOTTOM > mapPinMain.offsetTop - shift.y) {
        if (mapPinMain.offsetLeft - shift.x > mapPins.offsetLeft - PIN_HALF_WIDTH && mapPinMain.offsetTop - shift.y > mapPins.offsetTop + MAP_BORDER_TOP) {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }
      }

      setCordinate(parseInt(mapPinMain.style.left, 10) + PIN_HALF_WIDTH, parseInt(mapPinMain.style.top, 10) + PIN_FULL_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

  var onMainPinMouseUp = function () {
    activateMap();
    window.pin.renderPins();

    mapPinMain.removeEventListener('mouseup', onMainPinMouseUp);
  };

  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);


})();
