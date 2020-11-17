import React from 'react';

import './SuccessfulRegistrationPopup.css';

export default function SuccessfulRegistrationPopup(props) {
  function handleClosePopup() {
    props.onClose(false);
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose(false);
    }
  }

  function handleRedirect() {
    props.onClose(false);
    props.redirect(true);
  }

  return (
    <section className={`popup${props.isOpen ? ' popup_opened' : ''}`} onClick={handleOverlayClose}>
      <div className="popup-window">
        <h3 className="popup-window__title">Пользователь успешно зарегистрирован!</h3>
        <p className="popup-window__success-redirect" onClick={handleRedirect}>Войти</p>
        <button onClick={handleClosePopup}
                type="button"
                className="popup__close"
        />
      </div>
    </section>
  )
}
