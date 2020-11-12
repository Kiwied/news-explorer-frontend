import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <div className="footer__links">
          <Link to="/" className="footer__link">Главная</Link>
          <a href="https://praktikum.yandex.ru/"
             target="_blank"
             rel="noreferrer"
             className="footer__link">Яндекс.Практикум</a>
        </div>
        <div className="footer__icons">
          <a href="https://github.com/Kiwied"
             target="_blank"
             rel="noreferrer"
             className="footer__icon footer__icon_github"/>
          <a href="https://vk.com/kiwied"
             target="_blank"
             rel="noreferrer"
             className="footer__icon footer__icon_vk"/>
        </div>
      </nav>
    </footer>
  )
}
