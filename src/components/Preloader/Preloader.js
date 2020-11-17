import React from 'react';

import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader">
      <i className="preloader__circle"/>
      <p className='preloader__text'>Идет поиск новостей...</p>
    </div>
  )
}
