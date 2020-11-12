import React from 'react';
import { NavLink } from "react-router-dom";

import './Navigation.css';

import logout from "../../images/logout.svg";
import logoutBlack from "../../images/logout-black.svg";

export default function Navigation(props) {
  const navContainerClass = props.isMenuOpen ? 'header__nav-container header__nav-container_mobile' : 'header__nav-container';
  const linkClass = !props.isRouteSaved ? 'header__link' : 'header__link header__link_color_black';
  const activeLinkClass = !props.isRouteSaved ? 'header__link_active' : 'header__link_active header__link_active_color_black';
  const authBtnClass = !props.isRouteSaved ? 'header__auth-btn' : 'header__auth-btn header__auth-btn_color_black';

  return (
    <nav className={navContainerClass}>
      <NavLink exact to="/"
               className={linkClass}
               activeClassName={activeLinkClass}
               onClick={props.closeMenu}
      >
        Главная
      </NavLink>
      {
        props.loggedIn
          ? (
            <>
              <NavLink to="/saved-news"
                       className={linkClass}
                       activeClassName={activeLinkClass}
                       onClick={props.closeMenu}
              >
                Сохранённые статьи
              </NavLink>
              <button className={authBtnClass}
                      onClick={props.onLogout}>
                Грета
                <img src={props.isMenuOpen ? logout : (!props.isRouteSaved ? logout : logoutBlack)}
                     alt="Иконка логаута"
                     className="header__auth-img"/>
              </button>
            </>
          )
          : (
            <button className={authBtnClass}
                    onClick={props.onAuth}>
              Авторизоваться
            </button>
          )
      }
    </nav>
  )

}
