import React from 'react';
import PropTypes from 'prop-types';
import * as NProgress from 'nprogress';
import parseUrl from 'url-parse';

import './style.scss';
import NavBar from '../nav-bar';

const { ipcRenderer } = window.require('electron');

// Used by WebView while loading any pages
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';

class WebPage extends React.Component {
  webView = React.createRef();
  state = {
    url: this.props.url,
    showNav: true
  };

  /**
   * Configures the loader and binds it to
   * the webview
   */
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

    currentWebView.addEventListener('new-window', (event) => {
      const currentUrl = this.webView.current.getURL();
      const newUrl = event.url;

      const parsedCurrentUrl = parseUrl(currentUrl, true);
      const parsedNewUrl = parseUrl(newUrl, true);

      // Only allow opening windows from current domain to avoid ads-popups
      if (parsedNewUrl.host === parsedCurrentUrl.host) {
        this.props.onUrl(newUrl);
      }
    });

    // Capture link clicks on page and update state with new url
    currentWebView.addEventListener('did-navigate', (event) => {
      this.setState({
        url: event.url
      });
    });

    // Also handle in-page navigation
    currentWebView.addEventListener('did-navigate-in-page', (event) => {
      this.setState({
        url: event.url
      });
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

  toggleNavBar = () => {
    this.setState(state => ({
      showNav: !state.showNav
    }));
  };

  showNavBar = () => {
    this.setState({
      showNav: true
    });
  };

  bindNavBar() {
    ipcRenderer.on('nav.toggle', this.toggleNavBar);
    ipcRenderer.on('nav.show', this.showNavBar);
  }

  unbindNavBar() {
    ipcRenderer.removeListener('opacity.toggle', this.toggleNavBar);
    ipcRenderer.removeListener('nav.show', this.showNavBar);
  }

  componentDidMount() {
    this.configureLoader();
    this.bindNavBar();
    this.unbindNavBar();
  }

  render() {
    return (
      <div className={ 'webpage ' + (this.state.showNav && 'with-nav') }>
        {
          this.state.showNav && <NavBar
            url={ this.state.url }
            onUrl={ this.props.onUrl }
            onReload={ this.onReload }
            onBack={ this.onBack }
            onForward={ this.onForward }
          />
        }
        <webview
          plugins="true"
          useragent={ USER_AGENT }
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
