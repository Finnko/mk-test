"use strict";

const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

let isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

let isEnterEvent = function (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

let prepareFormData = function (data) {
  let object = {};

  data.forEach(function(value, key){
    object[key] = value;
  });
  return JSON.stringify(object);
};

export { isEnterEvent, isEscEvent, prepareFormData }
