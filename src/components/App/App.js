import React from 'react';
import { withRouter, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import getNews from "../../utils/NewsApi";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import SuccessfulRegistrationPopup from "../SuccessfulRegistrationPopup/SuccessfulRegistrationPopup";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noResults, setNoResults] = React.useState(false);
  const [serverErrMessage, setServerErrMessage] = React.useState('');

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      mainApi.getUserInfo(jwt)
        .then(res => {
          if (res) {
            setCurrentUser(res.user.name);
            setLoggedIn(true);
          }
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn, history])

  function handleLoginPopupOpen() {
    setServerErrMessage('');
    setIsMenuOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
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

  function handleNewsSearch(keyword) {
    setArticles([]);
    setNoResults(false);
    setIsLoading(true);
    getNews(keyword)
      .then(res => {
        if (res.articles.length === 0) {
          setNoResults(true);
          return;
        }
        const articles = res.articles;
        articles.map((currentArticle, i) => {
          currentArticle.keyword = keyword[0].toUpperCase()
            + keyword.slice(1);
          currentArticle.id = i + 1;
          return currentArticle;
        })
        setArticles(articles);
        localStorage.removeItem('articles');
        localStorage.setItem('articles', JSON.stringify(articles));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        setNoResults(true);
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn}
                    onLogout={handleLogout}
                    onAuth={handleLoginPopupOpen}
                    isRouteSaved={false}
                    isMenuOpen={isMenuOpen}
                    toggleMenu={handleToggleMenu}
                    closeMenu={handleCloseMenu}
                    isPopupOpen={isLoginPopupOpen || isRegisterPopupOpen || isSuccessPopupOpen}
            />
            <Main loggedIn={loggedIn}
                  getNews={handleNewsSearch}
                  articles={articles}
                  setArticles={setArticles}
                  isLoading={isLoading}
                  noResults={noResults}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
            />
          </Route>

          <ProtectedRoute path="/saved-news"
                          component={Header}
                          secondComponent={SavedNews}
                          loggedIn={loggedIn}
                          onLogout={handleLogout}
                          onAuth={handleLoginPopupOpen}
                          isRouteSaved={true}
                          isMenuOpen={isMenuOpen}
                          toggleMenu={handleToggleMenu}
                          isPopupOpen={isLoginPopupOpen || isRegisterPopupOpen || isSuccessPopupOpen}
                          history={history}
                          savedArticles={savedArticles}
                          setSavedArticles={setSavedArticles}
          />
        </Switch>

        <Footer/>

        <LoginPopup onClose={setIsLoginPopupOpen}
                    isOpen={isLoginPopupOpen}
                    redirect={setIsRegisterPopupOpen}
                    serverErrMessage={serverErrMessage}
                    setServerErrMessage={setServerErrMessage}
                    setLoggedIn={setLoggedIn}

        />

        <RegisterPopup onClose={setIsRegisterPopupOpen}
                       isOpen={isRegisterPopupOpen}
                       redirect={setIsLoginPopupOpen}
                       serverErrMessage={serverErrMessage}
                       setServerErrMessage={setServerErrMessage}
                       setSuccessPopupOpen={setIsSuccessPopupOpen}
        />
        <SuccessfulRegistrationPopup onClose={setIsSuccessPopupOpen}
                                     isOpen={isSuccessPopupOpen}
                                     redirect={setIsLoginPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
