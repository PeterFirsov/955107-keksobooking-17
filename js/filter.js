'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };
  var OBJECT_LIMIT = 5;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var clearPins = function () {
    var offers = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    offers.forEach(function (offer) {
      offer.remove();
    });
  };

  var filtersForm = document.querySelector('.map__filters');

  var filterIt = function (offers) {

    var filteredOffers = offers.slice();

    var selectorFilters = filtersForm.querySelectorAll('select');
    var featuresFilters = filtersForm.querySelectorAll('input[type=checkbox]:checked');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredOffers.filter(function (offerData) {

        var priceFilterValues = {
          'middle': offerData.offer.price >= PRICES_TO_COMPARE.low && offerData.offer.price < PRICES_TO_COMPARE.high,
          'low': offerData.offer.price < PRICES_TO_COMPARE.low,
          'high': offerData.offer.price >= PRICES_TO_COMPARE.high
        };

        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (item) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (selectorFilters.length !== null) {
      selectorFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteredOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredOffers = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }

    if (filteredOffers.length) {
      window.pin.renderPins(filteredOffers.slice(0, OBJECT_LIMIT));
    }

  };

  window.filter = {
    filterIt: function (offers) {
      filterIt(offers);
    },
    clearPins: clearPins
  };

})();
