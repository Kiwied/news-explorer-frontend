import React from 'react';

import './SavedNews.css';
import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { mainApi } from "../../utils/MainApi";

export default function SavedNews({ savedArticles, setSavedArticles, ...props }) {


  React.useEffect(() => {
    console.log(savedArticles);
    const jwt = localStorage.getItem('token');
    mainApi.getSavedArticles(jwt)
      .then(res => {
        setSavedArticles(res);
      })
      .catch(err => console.log(err));
  }, [props.loggedIn, props.history])

  return (
    <main className="svd-news">
      <SavedNewsHeader  articles={savedArticles} />

      <section className="svd-news__cards">
        <ul className="svd-news__card-list">
          {[...savedArticles].reverse().map((currentCard, i) => (
            <NewsCard
              key={i}
              card={currentCard}
              loggedIn={props.loggedIn}
              isRouteSaved={true}
              setSavedArticles={setSavedArticles}
              savedArticles={savedArticles}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
