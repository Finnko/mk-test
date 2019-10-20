"use strict";

import { isEscEvent } from "../../build/js/util";

const regBtn = document.querySelector('.reg__btn');
const popup = document.querySelector('.reg-form');
const closeBtn = popup.querySelector('.form__close-btn');

let popupEscClickHandler = function (evt) {
  isEscEvent(evt, closePopup);
};

let openPopup = function (evt) {
  popup.classList.add('modal-show');
  document.addEventListener('keydown', popupEscClickHandler);
};

let closePopup = function () {
  if (popup.classList.contains('modal-show')) {
    popup.classList.remove('modal-show');
  }
  document.removeEventListener('keydown', popupEscClickHandler);
};

regBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});

closeBtn.addEventListener('click', function () {
  closePopup();
});
