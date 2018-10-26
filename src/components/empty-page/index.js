import React from 'react';

import { ReactComponent as PennywiseRaw } from '../../icons/pennywise.svg';
import style from './style.scss';

class EmptyPage extends React.Component {
  render() {
    return (
      <div className='empty-page'>
        <PennywiseRaw/>
        <h1>Pennywise</h1>
        <p>Enter the URL below to get started – I will float it for you</p>
        <input className={ style['search-input'] } type="text" placeholder="Enter a URL you would like to see float"/>
      </div>
    );
  }
}

export default EmptyPage;