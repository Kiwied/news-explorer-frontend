import React from 'react';
import { withRouter } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div className="app">
      <div className="app__main-container">
        <Header loggedIn={loggedIn}
                onLogout={handleLogout}
                onAuth={setIsSigninPopupOpen}
        />
        <Main/>
      </div>
    </div>
  );
}

export default withRouter(App);
