import React from 'react';

import './Main.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import SearchForm from "../SearchForm/SearchForm";

export default function Main(props) {
  return (
    <main className="main">
      <SearchForm getNews={props.getNews}
      />

      <div className="main__container">
        {props.articles.length !== 0 &&
          <>
            <h2 className="main__title">Результаты поиска</h2>
            <NewsCardList loggedIn={props.loggedIn} articles={props.articles}/>
          </>}
      </div>

      <About/>
    </main>
  )
}
