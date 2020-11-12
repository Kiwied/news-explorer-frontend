import React from 'react';

import './SavedNewsHeader.css';

export default function SavedNewsHeader() {

  return (
    <section className="svd-news__title-container">
      <p className="svd-news__description">Сохранённые статьи</p>
      <h1 className="svd-news__title">Грета, у вас 5 сохранённых статей</h1>
      <p className="svd-news__keywords">По ключевым словам:
        <span className="svd-news__keywords_span"> Природа, Тайга</span> и
        <span className="svd-news__keywords_span"> 2-м другим</span></p>
    </section>
  )
}
