import React from 'react';

import EmptyPage from './components/empty-page';
import WebPage from './components/web-page';
import { prepareUrl } from './utils/helpers';

class Browser extends React.Component {
  state = {
    url: ''
  };

  onUrl = (url) => {
    this.setState({
      url: prepareUrl(url)
    });
  };

  render() {
    return (
      <div className='browser-wrap'>
        {
          this.state.url
            ? <WebPage url={ this.state.url } onUrl={ this.onUrl }/>
            : <EmptyPage onUrl={ this.onUrl }/>
        }
      </div>
    );
  }
}

export default Browser;
