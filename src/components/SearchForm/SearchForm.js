import React from 'react';

import './SearchForm.css';

export default function SearchForm(props) {
  const keywordRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.getNews(keywordRef.current.value);
  }

  return (
    <section className="search">
      <div className="search__container">
        <div>
          <h1 className="search__title">Что творится в мире?</h1>
          <p className="search__description">Находите самые свежие статьи на любую тему
            и сохраняйте в своём личном кабинете.</p>
        </div>

        <form className="search__form" onSubmit={handleSubmit}>
          <input type="text"
                 placeholder="Введите тему новости"
                 className="search__input"
                 ref={keywordRef}
                 required
          />
          <button type="submit"
                  className="search__submit"
          >Искать</button>
        </form>
      </div>
    </section>
  )
}
