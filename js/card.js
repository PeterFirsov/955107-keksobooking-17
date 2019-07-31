'use strict';

(function () {
  var ESC_KEYCODE = 27;
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
    var photoAlbum = cardElement.querySelector('.popup__photos');
    var photo = photoAlbum.querySelector('.popup__photo');
    var close = cardElement.querySelector('.popup__close');

    avatar.src = card.author.avatar;
    avatar.alt = card.offer.title;
    title.textContent = card.offer.title;
    address.textContent = card.offer.address;
    price.textContent = card.offer.price + '/ночь';

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        cardElement.remove();
        window.removeEventListener('keydown', function () {});
      }
    });
    close.addEventListener('click', function () {
      cardElement.remove();
      close.removeEventListener('click', function () {});
    });

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

      var numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
        if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
          return genitivePlural;
        } else {
          switch (num % 10) {
            case 1:
              return nominative;
            case 2:
            case 3:
            case 4:
              return genitiveSingular;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0:
              return genitivePlural;
          }
        }
        return num;
      };

      capacity.textContent = card.offer.rooms + ' ' + numDecline(card.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + card.offer.guests + ' ' + numDecline(card.offer.guests, 'гостя', 'гостей', 'гостей');

      if (card.offer.rooms === 0 || card.offer.guests === 0) {
        capacity.textContent = 'не для гостей';
      }

    };
    addCapacity();

    time.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

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

    photo.src = card.offer.photos[0];

    for (var i = 1; i < card.offer.photos.length; i++) {
      var imageElement = photo.cloneNode(true);
      imageElement.src = card.offer.photos[i];
      photoAlbum.appendChild(imageElement);
    }

    return cardElement;
  };

  window.card.renderCards = function (array) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(renderCard(array));

    filtersContainer.appendChild(fragment);
  };

  var clearPopup = function () {
    var popups = filtersContainer.querySelectorAll('.map__card');
    popups.forEach(function (popup) {
      popup.remove();
    });
  };

  window.card.clearPopup = clearPopup;

})();
