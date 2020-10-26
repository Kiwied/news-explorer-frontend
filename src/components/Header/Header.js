import React from 'react';
import { Link } from 'react-router-dom';

import logout from '../../images/logout.svg';
import './Header.css';

export default function Header(props) {

  return (
    <header className="header">
      <Link to="/" className="header__logo">NewsExplorer</Link>
      <nav className="header__container">
        <Link to="/" className="header__link">Главная</Link>
        {
          props.loggedIn
            ? (
              <>
                <Link to="/saved-news" className="header__link">Сохранённые статьи</Link>
                <button className="header__auth-btn"
                        onClick={props.onLogout}>
                  <p className="header__auth-text">Грета</p>
                  <img src={logout}
                       alt="Иконка логаута"
                       className="header__auth-img"/>
                </button>
              </>
            )
            : (
              <button className="header__auth-btn"
                      onClick={props.onAuth}>
                Авторизоваться
              </button>
            )
        }
      </nav>
    </header>
  )
}
