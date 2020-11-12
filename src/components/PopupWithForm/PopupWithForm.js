import React from 'react';

import './PopupWithForm.css';

export default function PopupWithForm(props) {
  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        props.onClose();
      }
    }

    document
      .getElementById('popup')
      .addEventListener('click', handleOverlayClose)

    return() => {
      document
        .getElementById('popup')
        .removeEventListener('click', handleOverlayClose)
    }
  }, [])

  let title;
  let submit;
  let redirect;

  switch (props.content) {
    case 'signin':
      title = 'Вход';
      submit = 'Войти';
      redirect = 'Зарегистрироваться';
      break;

    case 'register':
      title = 'Регистрация';
      submit = 'Зарегистрироваться';
      redirect = 'Войти';
      break;

    case 'success':
      title = 'Пользователь успешно зарегистрирован!';
      break;

    default:
      title = 'Вход';
      submit = 'Войти';
      redirect = 'Зарегистрироваться';
  }

  function handleChangeContent() {
    (props.content === 'signin')
      ? props.onChangeContent('register')
      : props.onChangeContent('signin');
  }

  return (
    <section className={`popup${props.isOpen ? ' popup_opened' : ''}`}
             id="popup"
    >
      <form className="popup-form">
        <h3 className="popup-form__title">{title}</h3>

        {
          (props.content === 'signin' || props.content === 'register') && (
            <>
              <label className="popup-form__label"
                     htmlFor="input-email">Email</label>
              <input className="popup-form__input"
                     id="input-email"
                     type="email"
                     placeholder="Введите почту"
                     required
              />

              <label className="popup-form__label"
                     htmlFor="input-password">Пароль</label>
              <input className="popup-form__input"
                     id="input-password"
                     type="password"
                     placeholder="Введите пароль"
                     required
              />

              {
                (props.content === 'register') && (
                  <>
                    <label className="popup-form__label"
                           htmlFor="input-name">Имя</label>
                    <input className="popup-form__input"
                           id="input-name"
                           type="string"
                           placeholder="Введите имя"
                           required
                    />
                  </>
                )
              }

              <button type="submit" className="popup-form__submit">{submit}</button>

              <p className="popup-form__redirect">или
                <span className="popup-form__redirect popup-form__redirect_span"
                      onClick={handleChangeContent}
                > {redirect}</span>
              </p>
            </>
          )
        }

        {
          (props.content === 'success') && (
            <p className="popup-form__success-redirect">Войти</p>
          )
        }

        <button onClick={props.onClose}
                type="button"
                className="popup__close"
        />
      </form>
    </section>
  )
}
