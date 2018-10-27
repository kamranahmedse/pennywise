import React from 'react';
import PropTypes from 'prop-types';
import * as NProgress from 'nprogress';
import './style.scss';
import NavBar from '../nav-bar';

// const { ipcRenderer } = window.require('electron');

class WebPage extends React.Component {
  webView = React.createRef();
  state = {
    url: this.props.url,
  };

  configureLoader() {
    NProgress.configure({
      easing: 'ease',
      speed: 800,
      minimum: 0.2,
      showSpinner: false
    });

    const currentWebView = this.webView.current;
    currentWebView.addEventListener('did-start-loading', () => {
      NProgress.start();
    });

    currentWebView.addEventListener('did-stop-loading', () => {
      NProgress.done();
    });
  }

  onReload = () => {
    this.webView.current.reloadIgnoringCache();
  };

  onBack = () => {
    if (!this.webView.current.canGoBack()) {
      return;
    }

    this.webView.current.goBack();
  };

  onForward = () => {
    if (!this.webView.current.canGoForward()) {
      return;
    }

    this.webView.current.goForward();
  };

  componentDidMount() {
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    this.configureLoader();
  }

  render() {
    return (
      <div className='webpage'>
        <NavBar url={ this.state.url } onUrl={ this.props.onUrl } onReload={ this.onReload } onBack={ this.onBack } onForward={ this.onForward }/>
        <webview
          ref={ this.webView }
          id="view"
          className="page"
          src={ this.props.url }
          autosize="on"
        />
      </div>
    );
  }
}

WebPage.propTypes = {
  url: PropTypes.string.isRequired,
  onUrl: PropTypes.func.isRequired
};

export default WebPage;