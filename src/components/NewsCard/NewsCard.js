import React from 'react';

import './NewsCard.css';
import { mainApi } from "../../utils/MainApi";

export default function NewsCard(props) {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [cardId, setCardId] = React.useState('');

  function handleFav() {
    const jwt = localStorage.getItem('token');
    mainApi.saveArticle(jwt, {
      keyword: props.card.keyword,
      title: props.card.title,
      text: props.card.description,
      date: props.card.publishedAt,
      source: props.card.source.name,
      link: props.card.url,
      image: props.card.urlToImage
    })
      .then((res) => {
        setCardId(res.article._id);
        localStorage.removeItem('savedArticles');
        props.setSavedArticles((articles) => {
          localStorage.setItem('savedArticles', JSON.stringify([...articles, props.card]));
          return [...articles, props.card];
        });
        setIsFavourite(!isFavourite);
      })
      .catch(err => console.log(err))
  }

  function handleUnfav() {
    const idForDeletion = props.isRouteSaved ? props.card._id : cardId;
    const jwt = localStorage.getItem('token');
    mainApi.deleteArticle(jwt, idForDeletion)
      .then(() => {
        props.setSavedArticles((article) => {
          const res = article.filter(card =>
            props.isRouteSaved
              ? card._id !== props.card._id
              : card.urlToImage !== props.card.urlToImage && card.description === props.card.description);
          localStorage.removeItem('savedArticles');
          localStorage.setItem('savedArticles', JSON.stringify(res));
          return res;
        })
        setIsFavourite(!isFavourite);
      })
      .catch(err => console.log(err))
  }

  function dateConverting(date) {
    const publishDate = new Date(date);
    return `${publishDate.toLocaleString("ru-RU", { month: 'long', day: 'numeric' })}, ${publishDate.getFullYear()}`;
  }

  React.useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
    if (!savedArticles) return;
    if (savedArticles.find(currentArticle => currentArticle.urlToImage === props.card.urlToImage
      && currentArticle.description === props.card.description)) {
      setIsFavourite(true);
    }
  }, [])

  return (
    <li className="card">
      <img src={props.card.urlToImage || props.card.image}
           alt={`Изображение ${props.card.title}`}
           className="card__image"
      />
      <div className="card__container">
        <p className="card__date">{dateConverting(props.card.publishedAt || props.card.date)}</p>
        <h3 className="card__title">{props.card.title}</h3>
        <p className="card__description">{props.card.description || props.card.text}</p>
        <a className="card__source"
           href={props.card.url || props.card.link}
           target="_blank"
           rel="noreferrer"
        >{props.card.source.name || props.card.source}</a>
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
              onClick={props.isRouteSaved ? handleUnfav : (isFavourite ? handleUnfav : handleFav)}
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
