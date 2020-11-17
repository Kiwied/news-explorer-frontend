import React from 'react';

import './PopupWithForm.css';

export default function PopupWithForm(props) {
  function handleClosePopup() {
    props.onClose(false);
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose(false);
    }
  }

  return (
    <section className={`popup${props.isOpen ? ' popup_opened' : ''}`} onClick={handleOverlayClose}>
      <form className="popup-form" noValidate={true}>
        <h3 className="popup-form__title">{props.title}</h3>
        {props.children}
        <span className='popup-form__server-error'>{props.error}</span>
        <button type="submit"
                className={`popup-form__submit${props.isValid ? '' : ' popup-form__submit_disabled'}`}
                disabled={!props.isValid}
        >
          {props.submitText}
        </button>
        <p className="popup-form__redirect">или
          <span className="popup-form__redirect popup-form__redirect_span"
                onClick={props.redirect}
          > {props.redirectText}</span>
        </p>
        <button onClick={handleClosePopup}
                type="button"
                className="popup__close"
        />
      </form>
    </section>
  )
}
