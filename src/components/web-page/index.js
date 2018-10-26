import React from 'react';

import './style.scss';
import NavBar from '../nav-bar';

class WebPage extends React.Component {
  render() {
    return (
      <div className='webpage'>
        <NavBar/>
        <webview id="view" className="page" src="http://github.com/kamranahmedse/" autosize="on"/>
      </div>
    );
  }
}

export default WebPage;