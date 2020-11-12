import React from 'react';

import './SavedNews.css';
import savedCards from "../../utils/savedCards";
import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

export default function SavedNews(props) {
  return (
    <main className="svd-news">
      <SavedNewsHeader/>

      <section className="svd-news__cards">
        <ul className="svd-news__card-list">
          {savedCards.map((currentCard, i) => (
            <NewsCard
              key={i}
              card={currentCard}
              loggedIn={props.loggedIn}
              isRouteSaved={true}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
