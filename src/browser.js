import React from 'react';
import WebPage from './components/web-page';

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
