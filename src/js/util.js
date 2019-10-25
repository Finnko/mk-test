'use strict';

const ESC_KEYCODE = 27;

const doOnEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

const checkValues = (fieldFrom, fieldTo) => {
  return fieldTo.value && fieldTo.value === fieldFrom.value;
};

const prepareFormData = (data) => {
  let object = {};

  data.forEach(function (value, key) {
    object[key] = value;
  });
  return JSON.stringify(object);
};

export { doOnEscEvent, prepareFormData, checkValues };
