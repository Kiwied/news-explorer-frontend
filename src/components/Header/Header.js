import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Navigation from "../Navigation/Navigation";

export default function Header(props) {

  const headerClass = !props.isRouteSaved ? 'header__container' : 'header__container header__container_color_black';
  const logoClass = !props.isRouteSaved ? 'header__logo' : 'header__logo header__logo_color_black';
  const menuBtnClass = !props.isRouteSaved ? 'header__open-menu-btn' : 'header__open-menu-btn header__open-menu-btn_color_black';

  return (
    <header className={props.isMenuOpen ? 'header__container header__container_mobile-menu' : headerClass}>
      <div className="header">
        <Link to="/"
              className={props.isMenuOpen ? 'header__logo' : logoClass}
              onClick={props.closeMenu}
        >NewsExplorer</Link>
        <Navigation isRouteSaved={props.isRouteSaved}
                    loggedIn={props.loggedIn}
                    onLogout={props.onLogout}
                    onAuth={props.onAuth}
                    isMenuOpen={props.isMenuOpen}
                    closeMenu={props.closeMenu}
        />
        <button type="button"
                className={props.isPopupOpen
                  ? 'header__open-menu-btn header__open-menu-btn_disabled'
                  : (props.isMenuOpen ? 'header__open-menu-btn' : menuBtnClass)}
                onClick={props.toggleMenu}
        />
      </div>
    </header>
  )
}
