'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };

})();
