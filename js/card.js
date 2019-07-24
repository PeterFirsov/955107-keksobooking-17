'use strict';

(function () {
  var map = document.querySelector('.map');

  var filtersContainer = map.querySelector('.map__filters-container');

  var similarCardElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (card) {
    var cardElement = similarCardElement.cloneNode(true);
    var avatar = cardElement.querySelector('.popup__avatar');
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var time = cardElement.querySelector('.popup__text--time');
    var features = cardElement.querySelector('.popup__features');
    var items = features.querySelectorAll('.popup__feature');
    var description = cardElement.querySelector('.popup__description');
    /*var photo = cardElement.querySelector('.popup__photos');*/

    avatar.src = card.author.avatar;
    avatar.alt = card.offer.title;
    title.textContent = card.offer.title;
    address.textContent = card.offer.address;
    price.textContent = card.offer.price + '/ночь';

    var addType = function () {
      type.textContent = card.offer.type;
      switch (type.textContent) {
        case 'flat':
          type.textContent = 'Квартира';
          break;
        case 'bungalo':
          type.textContent = 'Бунгало';
          break;
        case 'house':
          type.textContent = 'Дом';
          break;
        case 'palace':
          type.textContent = 'Дворец';
          break;
      }
    };
    addType();


    var addCapacity = function () {
      if (card.offer.rooms === 1) {
        var room = 'комната';
      }
      if (card.offer.rooms > 1 && card.offer.rooms < 5) {
        room = 'комнаты';
      }
      if (card.offer.rooms > 5) {
        room = 'комнат';
      }
      if (card.offer.guests === 1) {
        var guest = 'гостя';
      }
      if (card.offer.guests > 1) {
        guest = 'гостей';
      }

      capacity.textContent = card.offer.rooms + ' ' + room + ' для ' + card.offer.guests + ' ' + guest;

      if (card.offer.rooms === 0 || card.offer.guests === 0) {
        capacity.textContent = 'не для гостей';
      }

      time.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    };
    addCapacity();

    var addFeatures = function () {
      var clearList = function () {
        items.forEach(function (item) {
          item.remove();
        });
      };

      clearList();

      for (var i = 0; i < card.offer.features.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + card.offer.features[i]);
        features.appendChild(featureElement);
      }
    };
    addFeatures();

    description.textContent = card.offer.description;

    /* for (var i = 0; i < card.offer.photos.length; i++) {
        var featureElement = document.createElement('img');
        featureElement.classList.add('popup__photo');
        featureElement.src = card.offer.photos[i];
        photo.appendChild(featureElement);
    }; */

    return cardElement;
  };

  window.card.renderCards = function (array) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(renderCard(array[1]));

    filtersContainer.appendChild(fragment);
  };

})();
