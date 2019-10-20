"use strict";

import {isEscEvent, prepareFormData} from "./util";

const regBtn = document.querySelector('.reg__btn');
const popup = document.querySelector('.reg-form');
const closeBtn = popup.querySelector('.form__close-btn');
const form = popup.querySelector('.form');
const submitBtn = popup.querySelector('.form__btn');
const inputPassword = popup.querySelector('.form__input--pass');
const passwordRules = popup.querySelectorAll('.rules__item');

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

let passwordRulesMap = {
  digits: /(?=.*[0-9])/,
  chars: /(?=.*[a-z])(?=.*[A-Z])/,
  length: /^.{6,32}$/
};

let checkPassword = function () {
  passwordRules.forEach(function (item) {
    let rule = item.dataset.pattern;
    let pattern = passwordRulesMap[rule];

    if (pattern.test(inputPassword.value.trim())) {
      item.classList.remove('rules__item--error');
      item.classList.add('rules__item--approve');
    } else if (item.classList.contains('rules__item--approve')) {
      item.classList.remove('rules__item--approve');
      item.classList.add('rules__item--error');
    }
  });
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


inputPassword.addEventListener('input', checkPassword);
form.addEventListener('submit', formSubmitHandler);
//
// submitBtn.disabled = true;
