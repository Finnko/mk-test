'use strict';

import { doOnEscEvent, prepareFormData } from './util';
import { fieldInputHandler, formChangeHandler, resetFieldsErrorClass, form, formInputs } from './validation';

(function () {
  const regBtn = document.querySelector('.reg__btn');
  const popup = document.querySelector('.reg-form');
  const closeBtn = popup.querySelector('.form__close-btn');
  const submitBtn = popup.querySelector('.form__btn');

  const popupEscClickHandler = (evt) => doOnEscEvent(evt, closePopup);

  const openPopup = () =>  {
    popup.classList.add('modal-show');
    document.addEventListener('keydown', popupEscClickHandler);
  };

  const closePopup = () =>  {
    if (popup.classList.contains('modal-show')) {
      popup.classList.remove('modal-show');
    }
    document.removeEventListener('keydown', popupEscClickHandler);
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    console.log(prepareFormData(data));
    closePopup();
    regBtn.classList.add('reg__btn--disabled');
  };

  regBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup();
  });

  closeBtn.addEventListener('click', () => {
    form.reset();
    resetFieldsErrorClass();
    closePopup();
  });

  formInputs.forEach((item) => {
    item.addEventListener('input', fieldInputHandler);
  });
  form.addEventListener('change', formChangeHandler);
  form.addEventListener('submit', formSubmitHandler);

  submitBtn.disabled = true;
})();
