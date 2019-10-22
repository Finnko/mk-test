"use strict";

import {isEscEvent, prepareFormData } from "./util";
import { formInputHandler, formChangeHandler, checkPasswordField, form, formInputs, passwordField } from "./validation";

const regBtn = document.querySelector('.reg__btn');
const popup = document.querySelector('.reg-form');
const closeBtn = popup.querySelector('.form__close-btn');
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
  formInputs.forEach(function (item) {
    item.classList.remove('form__input--error');
    item.nextElementSibling.textContent = '';
  });
  closePopup();
});

submitBtn.disabled = true;
form.addEventListener('change', formChangeHandler);
form.addEventListener('input', formInputHandler);
passwordField.addEventListener('input', checkPasswordField);
form.addEventListener('submit', formSubmitHandler);
