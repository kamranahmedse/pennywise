import React from 'react';
import isUrl from 'is-url';

import EmptyPage from './components/empty-page';
import WebPage from './components/web-page';

class Browser extends React.Component {
  state = {
    url: ''
  };

  static prepareUrl(url) {
    url = url.trim();

    if (!url) {
      return '';
    } else if (isUrl(url)) {
      return url;
    } else if (isUrl(`http://${url}`)) {
      return `http://${url}`;
    } else {
      return `https://www.google.com/search?q=${url}`;
    }
  }

  onUrl = (url) => {
    this.setState({
      url: Browser.prepareUrl(url)
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
