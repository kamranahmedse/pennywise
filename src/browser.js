import React from 'react';

import EmptyPage from './components/empty-page';
import WebPage from './components/web-page';
import { prepareUrl } from './utils/helpers';

const { ipcRenderer } = window.require('electron');

class Browser extends React.Component {
  state = {
    url: '',
    embedVideosEnabled: true
  };

  onUrl = (url) => {
    this.setState({
      url: prepareUrl(url, this.state.embedVideosEnabled),
    });
  };

  onembedVideosSet = (event, embedVideosEnabled) => {
    this.setState({ embedVideosEnabled });
  };

  onUrlRequested = (event, url) => {
    this.onUrl(url)
  };

  componentDidMount() {
    ipcRenderer.on('embedVideos.set', this.onembedVideosSet);
    ipcRenderer.on('url.requested', this.onUrlRequested);
  }

  componentWillUnmount() {
    ipcRenderer.removeEventListener('embedVideos.set', this.onembedVideosSet);
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
