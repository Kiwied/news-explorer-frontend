import React from 'react';

import './RegisterPopup.css';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../FormValidation/FormValidation";
import {mainApi} from "../../utils/MainApi";

export default function RegisterPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const validator = useFormWithValidation();

  function handleRegister(email, pass, name) {
    mainApi.register(email, pass, name)
      .then(() => {
        setEmail('');
        setPassword('');
        setName('');
        props.onClose(false);
        props.setSuccessPopupOpen(true);
      })
      .catch(err => {
        console.log(err);
        if (err === 'Ошибка: 409 Conflict') {
          props.setServerErrMessage('Пользователь с этим email уже зарегистрирован')
        } else if (err === 'Ошибка: 400 Bad Request') {
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

  function handleNameChange(evt) {
    setName(evt.target.value);
    validator.handleChange(evt);
  }

  function handleRedirect() {
    setEmail('');
    setPassword('');
    setName('');
    validator.resetForm();
    props.setServerErrMessage('');
    props.onClose(false);
    props.redirect(true);
  }

  function handleSubmit() {
    handleRegister(email, password, name);
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
                   onClose={props.onClose}
                   title="Регистрация"
                   submitText="Зарегистрироваться"
                   redirectText="Войти"
                   redirect={handleRedirect}
                   isValid={validator.isValid}
                   serverErrMessage={props.serverErrMessage}
                   onSubmit={handleSubmit}
    >
      <label className="popup-form__label"
             htmlFor="register-input-email">Email</label>
      <input className="popup-form__input"
             id="register-input-email"
             type="email"
             placeholder="Введите почту"
             onChange={handleEmailChange}
             name="email"
             value={email}
             required
      />
      <span className='popup-form__error'>{validator.errors.email}</span>

      <label className="popup-form__label"
             htmlFor="register-input-password">Пароль</label>
      <input className="popup-form__input"
             id="register-input-password"
             type="password"
             placeholder="Введите пароль"
             onChange={handlePasswordChange}
             name="password"
             value={password}
             minLength="8" maxLength="30"
             required
      />
      <span className='popup-form__error'>{validator.errors.password}</span>

      <label className="popup-form__label"
             htmlFor="register-input-name">Имя</label>
      <input className="popup-form__input"
             id="register-input-name"
             type="string"
             placeholder="Введите имя"
             onChange={handleNameChange}
             name="name"
             value={name}
             minLength="2" maxLength="30"
             pattern="^[A-Za-zА-Яа-яЁё \-]+$"
             required
      />
      <span className='popup-form__error'>{validator.errors.name}</span>
    </PopupWithForm>
  )
}
