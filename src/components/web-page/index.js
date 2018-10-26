import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class WebPage extends React.Component {
  render() {
    return (
      <div className='webpage'>
        <webview id="view" className="page" src={ this.props.url } autosize="on"/>
      </div>
    );
  }
}

WebPage.propTypes = {
  url: PropTypes.string.isRequired
};

export default WebPage;