import React from 'react';

import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search">
      <div>
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__description">Находите самые свежие статьи на любую тему
          и сохраняйте в своём личном кабинете.</p>
      </div>

      <form className="search__form">
        <input type="text"
               placeholder="Введите тему новости"
               className="search__input"
               required
        />
        <button type="submit"
                className="search__submit"
        >Искать</button>
      </form>
    </section>
  )
}
