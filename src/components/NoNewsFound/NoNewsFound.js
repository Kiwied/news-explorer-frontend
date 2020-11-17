import React from 'react';

import './NoNewsFound.css'
import notFound from '../../images/not-found.svg';

export default function NoNewsFound() {
  return (
    <div className="not-found">
      <img className='not-found__image' src={notFound} alt='Новости не найдены'/>
      <h3 className='not-found__title'>Ничего не найдено</h3>
      <p className='not-found__description'>К сожалению по вашему запросу ничего не найдено.</p>
    </div>
  )
}
