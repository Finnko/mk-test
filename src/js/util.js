"use strict";

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

var isEnterEvent = function (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

export { isEnterEvent, isEscEvent }
