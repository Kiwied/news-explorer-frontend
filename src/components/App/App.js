import React from 'react';
import { withRouter, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import getNews from "../../utils/NewsApi";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popupContent, setPopupContent] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [articles, setArticles] = React.useState([]);

  const history = useHistory();

  function handleLogout() {
    setLoggedIn(false);
    setIsMenuOpen(false);
    history.push('/');
  }

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleSigninPopupOpen() {
    setIsMenuOpen(false);
    setPopupContent('signin');
    setIsPopupOpen(true);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  function handleNewsSearch(keyword) {
    setArticles([]);
    getNews(keyword)
      .then(res => {
        const articles = res.articles;
        articles.map((currentArticle, i) => {
          currentArticle.keyword = keyword.charAt(0).toUpperCase()
            + keyword.slice(1);
          currentArticle.id = i;
          return currentArticle;
        })
        setArticles(articles);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={loggedIn}
                  onLogout={handleLogout}
                  onAuth={handleSigninPopupOpen}
                  isRouteSaved={false}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={handleToggleMenu}
                  closeMenu={handleCloseMenu}
                  isPopupOpen={isPopupOpen}
          />
          <Main loggedIn={loggedIn}
                getNews={handleNewsSearch}
                articles={articles}
          />
        </Route>

        <Route path="/saved-news">
          <Header loggedIn={loggedIn}
                  onLogout={handleLogout}
                  onAuth={handleSigninPopupOpen}
                  isRouteSaved={true}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={handleToggleMenu}
                  isPopupOpen={isPopupOpen}
          />
          <SavedNews loggedIn={loggedIn} />
        </Route>
      </Switch>

      <Footer/>

      <PopupWithForm content={popupContent}
                     onClose={handleClosePopup}
                     isOpen={isPopupOpen}
                     onChangeContent={setPopupContent}
      />
    </div>
  );
}

export default withRouter(App);
