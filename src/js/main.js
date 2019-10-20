"use strict";

import { isEscEvent } from "./util";

const regBtn = document.querySelector('.reg__btn');
const popup = document.querySelector('.reg-form');
const closeBtn = popup.querySelector('.form__close-btn');
const form = popup.querySelector('.form');
const submitBtn = popup.querySelector('.form__btn');

let popupEscClickHandler = function (evt) {
  isEscEvent(evt, closePopup);
};

let openPopup = function () {
  popup.classList.add('modal-show');
  document.addEventListener('keydown', popupEscClickHandler);
};

let closePopup = function () {
  if (popup.classList.contains('modal-show')) {
    popup.classList.remove('modal-show');
  }
  document.removeEventListener('keydown', popupEscClickHandler);
};

let prepareFormData = function (data) {
  let object = {};

  data.forEach(function(value, key){
    object[key] = value;
  });
  return JSON.stringify(object);
};

let formSubmitHandler = function (evt) {
  evt.preventDefault();
  let data = new FormData(form);
  console.log(prepareFormData(data));
  closePopup();
  regBtn.classList.add('reg__btn--disabled');
};

regBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});

closeBtn.addEventListener('click', function () {
  form.reset();
  closePopup();
});

form.addEventListener('submit', formSubmitHandler);
//
// submitBtn.disabled = true;
