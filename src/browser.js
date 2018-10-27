import React from 'react';
import isUrl from 'is-url';

import EmptyPage from './components/empty-page';
import NavBar from './components/nav-bar';
import WebPage from './components/web-page';

class Browser extends React.Component {
  state = {
    url: ''
  };

  static prepareUrl(url) {
    url = url.trim();

    if (isUrl(url)) {
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

  // noinspection JSMethodCanBeStatic
  renderEmptyPage() {
    return <EmptyPage onUrl={ this.onUrl }/>;
  }

  // noinspection JSMethodCanBeStatic
  renderWebPage() {
    return (
      <React.Fragment>
        <NavBar url={ this.state.url } onUrl={ this.onUrl }/>
        <WebPage url={ this.state.url }/>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='browser-wrap'>
        {
          this.state.url
            ? this.renderWebPage()
            : this.renderEmptyPage()
        }
      </div>
    );
  }
}

export default Browser;
