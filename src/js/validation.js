"use strict";

import {checkFieldsValidity} from "./util";

const popup = document.querySelector('.reg-form');
const form = popup.querySelector('.form');
const emailField = form.querySelector('#email');
const nicknameField = form.querySelector('#nickname');
const passwordField = form.querySelector('#password');
const passTestField = form.querySelector('#passtest');
const passwordRules = form.querySelectorAll('.rules__item');
const formInputs = form.querySelectorAll('.form__input');
const submitBtn = form.querySelector('.form__btn');

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

let passwordRulesMap = {
  digits: /(?=.*[0-9])/,
  chars: /(?=.*[a-z])(?=.*[A-Z])/,
  length: /^.{6,32}$/
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

  if (form.checkValidity() && checkFieldsValidity(formInputs)) {
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

export { formInputHandler, formChangeHandler, checkPasswordField, passwordField, formInputs, form };
