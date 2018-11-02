import React from 'react';
import isUrl from 'is-url';

import EmptyPage from './components/empty-page';
import WebPage from './components/web-page';

class Browser extends React.Component {
  state = {
    url: ''
  };

  /**
   * Gets the URL to redirect the user to
   * @param url
   * @return {string}
   */
  static prepareUrl(url) {
    url = url.trim();
    if (!url) {
      return '';
    }

    // Search on google if not a URL
    if (!isUrl(url) && !isUrl(`http://${url}`)) {
      return `https://www.google.com/search?q=${url}`;
    }

    // @todo magic URLs support

    return /^http(s)?:\/\//.test(url) ? url : `http://${url}`;
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
