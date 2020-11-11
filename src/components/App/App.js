import React from 'react';
import { withRouter, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popupContent, setPopupContent] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <div className="app__main-container">
            <Header loggedIn={loggedIn}
                    onLogout={handleLogout}
                    onAuth={handleSigninPopupOpen}
                    isRouteSaved={false}
                    isMenuOpen={isMenuOpen}
                    toggleMenu={handleToggleMenu}
                    closeMenu={handleCloseMenu}
                    isPopupOpen={isPopupOpen}
            />
            <SearchForm/>
          </div>

          <Main loggedIn={loggedIn} />
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
