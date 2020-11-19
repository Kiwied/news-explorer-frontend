import React from 'react';

import './SavedNewsHeader.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SavedNewsHeader(props) {
  const userName = React.useContext(CurrentUserContext);
  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    setKeywords(sortByFrequency(props.articles.map(article => {
      return article.keyword[0].toUpperCase() + article.keyword.slice(1)
    })));
  }, [props.articles])

  function sortByFrequency(array) {
    const frequency = {};

    array.forEach(function(value) { frequency[value] = 0; });

    const uniques = array.filter(function(value) {
      return ++frequency[value] === 1;
    });

    return uniques.sort(function(a, b) {
      return frequency[b] - frequency[a];
    });
  }

  function getSavedArticlesText(amount) {
    const lastDigit = amount.toString().split('').reverse().join('')[0];

    if (lastDigit == 0 || (lastDigit >= 5 && lastDigit <= 9)) {
      return 'сохранённых статей'
    } else if (lastDigit == 1) {
      return 'сохранённая статья'
    } else {
      return 'сохранённых статьи'
    }
  }

  function getNumberOfOthersText(amount) {
    const lastDigit = amount.toString().split('').reverse().join('')[0];

    if (lastDigit == 1) {
      return '-ому другому'
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return '-м другим'
    } else if (lastDigit == 7 || lastDigit == 8) {
      return '-ми другим'
    } else {
      return '-ти другим'
    }
  }

  return (
    <section className="svd-news__title-container">
      <p className="svd-news__description">Сохранённые статьи</p>
      <h1 className="svd-news__title">{userName.charAt(0).toUpperCase() + userName.slice(1)}
      , у вас {props.articles.length} {getSavedArticlesText(props.articles.length)}</h1>
      {props.articles.length !== 0 &&
      <p className="svd-news__keywords">По ключевым словам:
        {props.articles.length <= 3 ? <span className="svd-news__keywords_span"> {`${keywords.join(', ')}`}</span>
          : <><span className="svd-news__keywords_span"> {keywords[0]}, {keywords[1]}</span> и
          <span className="svd-news__keywords_span"> {keywords.length - 2}
          {getNumberOfOthersText(keywords.length - 2)}</span></>}
      </p>}
    </section>
  )
}
