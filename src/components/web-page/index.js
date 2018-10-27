import React from 'react';
import PropTypes from 'prop-types';
import * as NProgress from 'nprogress';

import './style.scss';

class WebPage extends React.Component {
  webView = React.createRef();

  configureLoader() {
    NProgress.configure({
      easing: 'ease',
      speed: 400,
      minimum: 0.2
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
        <webview ref={ this.webView } id="view" className="page" src={ this.props.url } autosize="on"/>
      </div>
    );
  }
}

WebPage.propTypes = {
  url: PropTypes.string.isRequired
};

export default WebPage;