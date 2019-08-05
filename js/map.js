'use strict';

(function () {
  var PIN_HALF_WIDTH = 31;
  var PIN_FULL_HEIGHT = 84;
  var MAP_BORDER_TOP = 45;
  var MAP_BORDER_BOTTOM = 73;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinCoordinateLeft = parseInt(mapPins.querySelector('.map__pin').style.left, 10);
  var pinCoordinateTop = parseInt(mapPins.querySelector('.map__pin').style.top, 10);
  var form = document.querySelector('.notice');
  var formFields = form.getElementsByTagName('fieldset');
  var cordinateInput = form.querySelector('input[name=address]');
  var fadeForm = form.querySelector('.ad-form');
  var mapFilter = map.querySelector('.map__filters');
  var mainPinStart = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };

  mapFilter.addEventListener('change', function () {
    window.filter.clearPins();
    window.card.clearPopup();
    window.debounce(function () {
      window.filter.filterIt(window.massiv.data());
    });
  });

  var setCordinate = function (xCord, yCord) {
    cordinateInput.value = xCord + ', ' + yCord;
  };
  setCordinate(pinCoordinateLeft + PIN_HALF_WIDTH, pinCoordinateTop + PIN_FULL_HEIGHT);

  var disableForm = function (first) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = first;
    }
    if (first) {
      map.classList.add('map--faded');
      fadeForm.classList.add('ad-form--disabled');
      setCordinate(pinCoordinateLeft + PIN_HALF_WIDTH, pinCoordinateTop + PIN_FULL_HEIGHT);
      mapPinMain.style.left = mainPinStart.x;
      mapPinMain.style.top = mainPinStart.y;
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
    window.pin.renderPins(window.massiv.firstData());
  };

  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

  window.map = {
    disable: function (answer) {
      disableForm(answer);
    }
  };

})();
