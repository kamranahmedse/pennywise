import React from 'react';

import EmptyPage from './components/empty-page';
import WebPage from './components/web-page';
import { prepareUrl } from './utils/helpers';

const { ipcRenderer } = window.require('electron');

class Browser extends React.Component {
  state = {
    url: '',
    magicUrlsEnabled: true
  };

  onUrl = (url) => {
    this.setState({
      url: prepareUrl(url, this.state.magicUrlsEnabled),
    });
  };

  onMagicUrlsSet = (event, magicUrlsEnabled) => {
    this.setState({ magicUrlsEnabled });
  };

  componentDidMount() {
    ipcRenderer.on('magicUrls.set', this.onMagicUrlsSet);
  }

  componentWillUnMount() {
    ipcRenderer.removeEventListener('magicUrls.set', this.onMagicUrlsSet);
  }

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
