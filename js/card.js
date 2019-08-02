'use strict';

(function () {
  var map = document.querySelector('.map');

  var filtersContainer = map.querySelector('.map__filters-container');

  var similarCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (card) {
    var cardMain = similarCard.cloneNode(true);
    var avatar = cardMain.querySelector('.popup__avatar');
    var title = cardMain.querySelector('.popup__title');
    var address = cardMain.querySelector('.popup__text--address');
    var price = cardMain.querySelector('.popup__text--price');
    var type = cardMain.querySelector('.popup__type');
    var capacity = cardMain.querySelector('.popup__text--capacity');
    var time = cardMain.querySelector('.popup__text--time');
    var features = cardMain.querySelector('.popup__features');
    var items = features.querySelectorAll('.popup__feature');
    var description = cardMain.querySelector('.popup__description');
    var photoAlbum = cardMain.querySelector('.popup__photos');
    var photo = photoAlbum.querySelector('.popup__photo');
    var close = cardMain.querySelector('.popup__close');

    if (card.author.avatar) {
      avatar.src = card.author.avatar;
    } else {
      avatar.classList.add('visually-hidden');
    }

    avatar.alt = card.offer.title;

    if (card.offer.title) {
      title.textContent = card.offer.title;
    } else {
      title.classList.add('visually-hidden');
    }

    if (card.offer.address) {
      address.textContent = card.offer.address;
    } else {
      address.classList.add('visually-hidden');
    }

    if (card.offer.price) {
      price.textContent = card.offer.price + '/ночь';
    } else {
      price.classList.add('visually-hidden');
    }

    window.addEventListener('keydown', function (evt) {
      var deleteCard = function () {
        cardMain.remove();
        window.removeEventListener('keydown', function () {});
      };
      window.util.isEscEvent(evt, deleteCard);
    });

    close.addEventListener('click', function () {
      cardMain.remove();
      close.removeEventListener('click', function () {});
    });

    var types = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    var addType = function () {
      if (card.offer.type) {
        type.textContent = types[card.offer.type];
      } else {
        type.classList.add('visually-hidden');
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

    if (card.offer.checkin && card.offer.checkout) {
      time.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      time.classList.add('visually-hidden');
    }

    var addFeatures = function () {
      var clearList = function () {
        items.forEach(function (item) {
          item.remove();
        });
      };

      clearList();

      if (card.offer.features.length === 0) {
        features.classList.add('visually-hidden');
      }

      for (var i = 0; i < card.offer.features.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + card.offer.features[i]);
        features.appendChild(featureElement);
      }
    };
    addFeatures();


    if (card.offer.description) {
      description.textContent = card.offer.description;
    } else {
      description.classList.add('visually-hidden');
    }

    if (card.offer.photos.length === 0) {
      photo.classList.add('visually-hidden');
    } else {
      photo.src = card.offer.photos[0];
    }


    for (var i = 1; i < card.offer.photos.length; i++) {
      var imageElement = photo.cloneNode(true);
      imageElement.src = card.offer.photos[i];
      photoAlbum.appendChild(imageElement);
    }

    return cardMain;
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
