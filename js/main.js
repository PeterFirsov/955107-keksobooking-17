'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var OBJECT_COUNT = 8;
var yLocation = {
  min: 130,
  max: 630
};

var objects = [];

var type = ['palace', 'flat', 'house', 'bungalo'];

var similarPinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var generateRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var addPins = function () {
  for (var i = 0; i < OBJECT_COUNT; i++) {
    objects.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: type[Math.floor(0 + Math.random() * type.length)]
      },
      location: {
        x: generateRandomInteger(1, map.offsetWidth),
        y: generateRandomInteger(yLocation.min, yLocation.max)
      }
    });
  }
};

var renderPin = function (pin) {
  var pinElement = similarPinElement.cloneNode(true);
  var image = pinElement.querySelector('img');

  pinElement.style.left = (pin.location.x - 20) + 'px';
  pinElement.style.top = (pin.location.y - 40) + 'px';
  image.src = pin.author.avatar;
  image.alt = 'заголовок объявления';

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPin(objects[i]));
  }

  mapPins.appendChild(fragment);
};

var form = document.querySelector('.notice');
var formFields = form.getElementsByTagName('fieldset');
var fadeForm = form.querySelector('.ad-form');
var pinCordinateLeft = parseInt(mapPins.querySelector('.map__pin').style.left, 10);
var pinCordinateTop = parseInt(mapPins.querySelector('.map__pin').style.top, 10);
var compliteCordinate = pinCordinateLeft + ', ' + pinCordinateTop;
var cordinateInput = form.querySelector('input[name=address]');
var no = false;
var yes = true;
var formType = fadeForm.querySelector('select[name=type]');
var formPrice = fadeForm.querySelector('input[name=price]');
var formIn = fadeForm.querySelector('select[name=timein]');
var formOut = fadeForm.querySelector('select[name=timeout]');

formType.addEventListener('change', function () {
  if (formType.value == 'bungalo') {
    formPrice.setAttribute('minlength', 0);
    formPrice.placeholder = '0';
  } if (formType.value == 'flat') {
    formPrice.setAttribute('minlength', 1000);
    formPrice.placeholder = '1000';
  } if (formType.value == 'house') {
    formPrice.setAttribute('minlength', 5000);
    formPrice.placeholder = '5000';
  } if (formType.value == 'palace') {
    formPrice.setAttribute('minlength', 10000);
    formPrice.placeholder = '10000';
  }
}, false);

formIn.addEventListener('change', function () {
  if (formIn.value == '12:00') {
    formOut.value = '12:00';
  } if (formIn.value == '13:00') {
    formOut.value = '13:00';
  } if (formIn.value == '14:00') {
    formOut.value = '14:00';
  }
}, false);

var setCordinate = function () {
  cordinateInput.setAttribute('value', compliteCordinate);
};
setCordinate();

var disableForm = function (first) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = first;
  }
};
disableForm(yes);

mapPinMain.addEventListener('click', function () {
  map.classList.remove('map--faded');
  fadeForm.classList.remove('ad-form--disabled');
  addPins();
  renderPins();
  disableForm(no);
});

mapPinMain.addEventListener('mouseup', function () {
  setCordinate();
});
