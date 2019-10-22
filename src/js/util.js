"use strict";

const ESC_KEYCODE = 27;

let isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
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

let checkFieldsValidity = function (inputs) {
  return Array.from(inputs).every(function (item) {
    return !item.classList.contains('form__input--error');
  })
};

export { isEscEvent, prepareFormData, checkFieldsValidity };
