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
import useFormWithValidation from "../FormValidation/FormValidation";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noResults, setNoResults] = React.useState(false);

  const history = useHistory();

  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const loginValidator = useFormWithValidation();

  function handleLoginPopupOpen() {
    setLoginEmail('');
    setLoginPassword('');
    loginValidator.resetForm();
    setIsMenuOpen(false);
    setIsLoginPopupOpen(true);
  }

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
          currentArticle.keyword = keyword.charAt(0).toUpperCase()
            + keyword.slice(1);
          currentArticle.id = i;
          return currentArticle;
        })
        setArticles(articles);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        setNoResults(true);
      })
      .finally(() => setIsLoading(false))
  }

  return (
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
                isLoading={isLoading}
                noResults={noResults}
          />
        </Route>

        <Route path="/saved-news">
          <Header loggedIn={loggedIn}
                  onLogout={handleLogout}
                  onAuth={handleLoginPopupOpen}
                  isRouteSaved={true}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={handleToggleMenu}
                  isPopupOpen={isLoginPopupOpen || isRegisterPopupOpen || isSuccessPopupOpen}
          />
          <SavedNews loggedIn={loggedIn} />
        </Route>
      </Switch>

      <Footer/>

      <LoginPopup onClose={setIsLoginPopupOpen}
                  isOpen={isLoginPopupOpen}
                  redirect={setIsRegisterPopupOpen}
                  email={loginEmail} setEmail={setLoginEmail}
                  password={loginPassword} setPassword={setLoginPassword}
                  validator={loginValidator}

      />
      <RegisterPopup onClose={setIsRegisterPopupOpen}
                     isOpen={isRegisterPopupOpen}
                     redirect={setIsLoginPopupOpen}
      />
      <SuccessfulRegistrationPopup onClose={setIsSuccessPopupOpen}
                                   isOpen={isSuccessPopupOpen}
                                   redirect={setIsLoginPopupOpen}
      />
    </div>
  );
}

export default withRouter(App);
