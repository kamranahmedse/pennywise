import React from 'react';
import PropTypes from 'prop-types';
import * as NProgress from 'nprogress';

import './style.scss';
import NavBar from '../nav-bar';

class WebPage extends React.Component {
  webView = React.createRef();
  state = {
    url: this.props.url
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

  componentDidMount() {
    this.configureLoader();
  }

  render() {
    return (
      <div className='webpage'>
        <NavBar url={ this.state.url } onUrl={ this.props.onUrl }/>
        <webview ref={ this.webView } id="view" className="page" src={ this.props.url } autosize="on"/>
      </div>
    );
  }
}

WebPage.propTypes = {
  url: PropTypes.string.isRequired,
  onUrl: PropTypes.func.isRequired
};

export default WebPage;