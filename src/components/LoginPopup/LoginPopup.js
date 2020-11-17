import React from 'react';

import './LoginPopup.css';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function LoginPopup({ email, setEmail, password, setPassword, validator, ...props }) {
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    validator.handleChange(evt);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    validator.handleChange(evt);
  }

  function handleRedirect() {
    setEmail('');
    setPassword('');
    validator.resetForm();
    props.onClose(false);
    props.redirect(true);
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
                   onClose={props.onClose}
                   title="Вход"
                   submitText="Войти"
                   redirectText="Зарегистрироваться"
                   redirect={handleRedirect}
                   isValid={validator.isValid}
    >
      <label className="popup-form__label"
             htmlFor="login-input-email">Email</label>
      <input className="popup-form__input"
             id="login-input-email"
             type="email"
             placeholder="Введите почту"
             onChange={handleEmailChange}
             name="email"
             value={email}
             required
      />
      <span className='popup-form__error'>{validator.errors.email}</span>

      <label className="popup-form__label"
             htmlFor="login-input-password">Пароль</label>
      <input className="popup-form__input"
             id="login-input-password"
             type="password"
             placeholder="Введите пароль"
             onChange={handlePasswordChange}
             name="password"
             value={password}
             minLength="8" maxLength="30"
             required
      />
      <span className='popup-form__error'>{validator.errors.password}</span>
    </PopupWithForm>
  )
}
