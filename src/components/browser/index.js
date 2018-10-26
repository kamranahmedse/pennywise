import React from 'react';
import NavBar from '../nav-bar';
import EmptyPage from '../empty-page';
import WebPage from '../web-page';

class Browser extends React.Component {
  render() {
    return (
      <div className='browser-wrap'>
        { /*<EmptyPage/>*/ }
        <WebPage/>
      </div>
    );
  }
}

export default Browser;
