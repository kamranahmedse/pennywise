import React from 'react';

import { ReactComponent as Pennywise } from '../../icons/pennywise.svg';
import './style.scss';

class EmptyPage extends React.Component {
  render() {
    return (
      <div className='empty-page'>
        <Pennywise/>
        <h1>Pennywise</h1>
        <p>Enter the URL below to get started – I will float it for you</p>
        <input type="text" placeholder="Enter a URL you would like to see float"/>
      </div>
    );
  }
}

export default EmptyPage;