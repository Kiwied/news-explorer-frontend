import React from 'react';

import './NewsCardList.css';
import cards from '../../utils/cards';
import NewsCard from '../NewsCard/NewsCard';

export default function NewsCardList(props) {
  const [cardsNumber, setCardsNumber] = React.useState(3);

  function handleGridExpansion() {
    setCardsNumber(cardsNumber + 3);
  }

  return (
    <section className="card-list-container">
      <ul className="card-list">
        {cards.slice(0, cardsNumber).map((currentCard, i) => (
          <NewsCard
            key={i}
            card={currentCard}
            loggedIn={props.loggedIn}
          />
        ))}
      </ul>
      <button type="button"
              className="card-list__more-btn"
              onClick={handleGridExpansion}
      >Показать еще</button>
    </section>
  )
}
