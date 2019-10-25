'use strict';

import { checkValues } from "./util";

const FIELD_ERROR_CLASS = 'form__input--error';

const popup = document.querySelector('.reg-form');
const form = popup.querySelector('.form');
const emailField = form.querySelector('#email');
const nicknameField = form.querySelector('#nickname');
const passwordField = form.querySelector('#password');
const passTestField = form.querySelector('#passtest');
const passwordRules = form.querySelectorAll('.rules__item');
const formInputs = form.querySelectorAll('.form__input');
const submitBtn = form.querySelector('.form__btn');

const checkSamePassword = function (message) {
  const isMatched = passTestField.value && passTestField.value !== passwordField.value;
  passTestField.classList.toggle(FIELD_ERROR_CLASS, isMatched);
  passTestField.nextElementSibling.textContent = isMatched ? message : '';
};

const checkPassword = function (message) {
  const isPasswordError = checkValues(emailField, passwordField) || checkValues(nicknameField, passwordField);
  passwordField.classList.toggle(FIELD_ERROR_CLASS, isPasswordError);
  passwordField.nextElementSibling.textContent = isPasswordError ? message : '';
};

const formRulesMap = {
  email: {
    rule: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    message: 'Введите корректный адрес email',
  },
  nickname: {
    rule: /^([a-zA-Z])[a-zA-Z0-9_;]{2,40}$/,
    message: 'Имя должно начинаться с буквы и может содержать только латинские буквы, цифры, _, ;. Длина 3-40 символов',
  },
  password: {
    rule: checkPassword,
    message: 'Пароль соответствует инструкциям и не совпадает с никнеймом или почтовым адресом',
  },
  passtest: {
    rule: checkSamePassword,
    message: 'Пароли не совпадают',
  }
};

const passwordRulesMap = {
  digits: /(?=.*[0-9])/,
  chars: /(?=.*[a-z])(?=.*[A-Z])/,
  length: /^.{6,32}$/,
};

const resetFieldsErrorClass = function () {
  formInputs.forEach((item) => {
    item.classList.remove(FIELD_ERROR_CLASS);
    item.nextElementSibling.textContent = '';
  });
  passwordRules.forEach((item) => {
    item.classList.remove('rules__item--approve');
  })
};

const formChangeHandler = function () {
  formInputs.forEach((item) => {
    const input = item.dataset.validate;
    const pattern = formRulesMap[input].rule;
    const message = formRulesMap[input].message;

    if (typeof pattern !== 'function') {
      const isFieldCorrect = item.value !== '' && !pattern.test(item.value.trim());
      if (isFieldCorrect) {
        item.classList.add(FIELD_ERROR_CLASS);
        item.nextElementSibling.textContent = message;
      }
    } else {
      pattern(message);
    }
  });

  if (form.checkValidity()) {
    submitBtn.disabled = false;
  }
};

const fieldInputHandler = function () {
  formInputs.forEach(function (item) {
    const input = item.dataset.validate;
    const pattern = formRulesMap[input].rule;

    if (typeof pattern !== 'function') {
      const isFieldCorrect = item.value !== '' && pattern.test(item.value.trim());
      if (isFieldCorrect) {
        item.classList.remove(FIELD_ERROR_CLASS);
        item.nextElementSibling.textContent = '';
      }
    } else {
      pattern();
    }
  });
};

const checkPasswordField = function () {
  passwordRules.forEach((item) => {
    const field = item.dataset.pattern;
    const pattern = passwordRulesMap[field];
    const isMatched = pattern.test(passwordField.value.trim());

    if (isMatched) {
      item.classList.remove('rules__item--error');
      item.classList.add('rules__item--approve');
    } else if (item.classList.contains('rules__item--approve')) {
      item.classList.remove('rules__item--approve');
      item.classList.add('rules__item--error');
    }
  });
};

passwordField.addEventListener('input', checkPasswordField);

export { fieldInputHandler, formChangeHandler, resetFieldsErrorClass, form, formInputs };
