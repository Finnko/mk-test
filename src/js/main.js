"use strict";

import {isEscEvent, prepareFormData} from "./util";

const regBtn = document.querySelector('.reg__btn');
const popup = document.querySelector('.reg-form');
const closeBtn = popup.querySelector('.form__close-btn');
const form = popup.querySelector('.form');
const submitBtn = popup.querySelector('.form__btn');
const passwordRules = popup.querySelectorAll('.rules__item');
const fieldCheckbox = popup.querySelector('.form__checkbox');
const emailField = popup.querySelector('#email');
const nicknameField = popup.querySelector('#nickname');
const passwordField = popup.querySelector('#password');
const passTestField = popup.querySelector('#passtest');
const formInputs = popup.querySelectorAll('.form__input');

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

let checkPassTest = function (message) {
  if (passTestField.value && passTestField.value !== passwordField.value) {
    passTestField.classList.add('form__input--error');
    passTestField.nextElementSibling.textContent = message;
  } else {
    passTestField.classList.remove('form__input--error');
    passTestField.nextElementSibling.textContent = '';
  }
};

let checkPassword = function (message) {
  if (passwordField.value && passwordField.value === emailField.value ||
      passwordField.value && passwordField.value === nicknameField.value) {
    passwordField.classList.add('form__input--error');
    passwordField.nextElementSibling.textContent = message;
  } else {
    passwordField.classList.remove('form__input--error');
    passwordField.nextElementSibling.textContent = '';
  }
};

let formRulesMap = {
  email: {
    rule: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    message: 'Введите корректный адрес email',
  },
  nickname: {
    rule: /^([a-zA-Z])[a-zA-Z0-9_;]{3,40}$/,
    message: 'Имя должно начинаться с буквы и может содержать только латинские буквы, цифры, _, ;. Длина 3-40 символов',
  },
  password: {
    rule: checkPassword,
    message: 'Пароль соответствует инструкциям и не совпадает с никнеймом или почтовым адресом'
  },
  passtest: {
    rule: checkPassTest,
    message: 'Пароли не совпадают'
  }
};

let checkFieldsValidity = function () {
  return fieldCheckbox.checked === true && Array.from(formInputs).every(function (item) {
    return !item.classList.contains('form__input--error');
  })
};

let formChangeHandler = function () {

  formInputs.forEach(function (item) {
    let input = item.dataset.validate;
    let pattern = formRulesMap[input].rule;
    let message = formRulesMap[input].message;

    if (typeof pattern !== 'function') {
      if (item.value !== '' && !pattern.test(item.value.trim())) {
        item.classList.add('form__input--error');
        item.nextElementSibling.textContent = message;
      }
    } else {
      pattern(message);
    }
  });

  if (form.checkValidity() && checkFieldsValidity()) {
    submitBtn.disabled = false;
  }
};

let formInputHandler = function () {

  formInputs.forEach(function (item) {
    let input = item.dataset.validate;
    let pattern = formRulesMap[input].rule;

    if (typeof pattern !== 'function') {
      if (item.value !== '' && pattern.test(item.value.trim())) {
        item.classList.remove('form__input--error');
        item.nextElementSibling.textContent = '';
      }
    } else {
      pattern();
    }
  });
};

let passwordRulesMap = {
  digits: /(?=.*[0-9])/,
  chars: /(?=.*[a-z])(?=.*[A-Z])/,
  length: /^.{6,32}$/
};

let checkPasswordField = function () {
  passwordRules.forEach(function (item) {
    let rule = item.dataset.pattern;
    let pattern = passwordRulesMap[rule];

    if (pattern.test(passwordField.value.trim())) {
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
