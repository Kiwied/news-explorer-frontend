import React from 'react';

import './Main.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

export default function Main(props) {
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">Результаты поиска</h2>
        <NewsCardList
          loggedIn={props.loggedIn}
        />
      </div>

      <About/>
    </main>
  )
}
