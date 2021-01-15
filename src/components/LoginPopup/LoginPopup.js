import React from 'react';

import './LoginPopup.css';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../FormValidation/FormValidation";
import {mainApi} from "../../utils/MainApi";

export default function LoginPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const validator = useFormWithValidation();

  function handleLogin() {
    mainApi.login(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        props.onClose(false);
        props.setLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
        if (err === 'Ошибка: 400 Bad Request') {
          props.setServerErrMessage('Введены некорректные данные')
        } else {
          props.setServerErrMessage('Ошибка сервера')
        }
      })
  }

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
    props.setServerErrMessage('');
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
                   serverErrMessage={props.serverErrMessage}
                   onSubmit={handleLogin}
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
