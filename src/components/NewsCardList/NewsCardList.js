import React from 'react';

import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

export default function NewsCardList(props) {
  const [cardsNumber, setCardsNumber] = React.useState(3);

  function handleGridExpansion() {
    setCardsNumber(cardsNumber + 3);
  }

  return (
    <section className="card-list-container">
      <ul className="card-list">
        {props.articles.slice(0, cardsNumber).map(currentCard => (
          <NewsCard
            key={currentCard.id + 1}
            card={currentCard}
            loggedIn={props.loggedIn}
            savedArticles={props.savedArticles}
            setSavedArticles={props.setSavedArticles}
          />
        ))}
      </ul>
      {props.articles.length >= cardsNumber &&
        <button type="button"
                 className="card-list__more-btn"
                 onClick={handleGridExpansion}
        >Показать еще</button>}
    </section>
  )
}
