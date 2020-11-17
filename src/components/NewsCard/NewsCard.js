import React from 'react';

import './NewsCard.css';

export default function NewsCard(props) {
  const [isFavourite, setIsFavourite] = React.useState(false);

  function handleFav() {
    setIsFavourite(!isFavourite);
  }

  function dateConverting(date) {
    const publishDate = new Date(date);
    return `${publishDate.toLocaleString("ru-RU", { month: 'long', day: 'numeric' })}, ${publishDate.getFullYear()}`;
  }

  return (
    <li className="card">
      <img src={props.card.urlToImage}
           alt={`Изображение ${props.card.title}`}
           className="card__image"
      />
      <div className="card__container">
        <p className="card__date">{dateConverting(props.card.publishedAt)}</p>
        <h3 className="card__title">{props.card.title}</h3>
        <p className="card__description">{props.card.description}</p>
        <a className="card__source"
           href={props.card.url}
           target="_blank"
           rel="noreferrer"
        >{props.card.source.name}</a>
      </div>
      <button type="button"
              className={`card__fav-btn${
                props.isRouteSaved
                ? (' card__fav-btn_delete')
                : (
                    props.loggedIn
                      ? (isFavourite ? ' card__fav-btn_clicked' : '')
                      : ''
                  )

              }`}
              onClick={handleFav}
      />
      {(!props.loggedIn || props.isRouteSaved) &&
        (
          <div className={'card__caution'}
          >
          {props.isRouteSaved
            ? 'Убрать из сохранённых'
            : 'Войдите, чтобы сохранять статьи'
          }
          </div>
        )
      }

      {props.isRouteSaved && (
        <div className="card__keyword">{props.card.keyword}</div>
      )}
    </li>
  )
}
