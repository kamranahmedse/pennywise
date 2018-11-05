import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Settings from '../settings';

const os = window.require('os');
const { ipcRenderer } = window.require('electron');

class NavBar extends Component {
  urlInput = React.createRef();
  platform = (os.platform() || '').toLowerCase();
  state = {
    url: this.props.url,
    settingsShown: false
  };

  toggleSettings = () => {
    this.setState((state) => ({
      settingsShown: !state.settingsShown
    }));
  };

  onChange = (e) => {
    this.setState({
      url: e.target.value
    });
  };

  onKeyPress = (e) => {
    // Move to URL and blur the input
    if (e.key === 'Enter') {
      this.props.onUrl(e.target.value);
      e.target.blur();
    }
  };

  onFocus = (e) => {
    e.target.select();
  };

  focusUrlInput = () => {
    if (this.urlInput && this.urlInput.current) {
      this.urlInput.current.focus();
    }
  };

  componentDidMount() {
    ipcRenderer.on('nav.focus', this.focusUrlInput);
  }

  componentWillUnMount() {
    ipcRenderer.removeListener('nav.focus', this.focusUrlInput);
  }

  /**
   * Renders the settings button for changing opacity
   * @return {*}
   */
  renderSettings() {
    // Only windows and mac support window opacity
    const supportsOpacity = this.platform === 'darwin' || /^win/.test(this.platform);
    if (!supportsOpacity) {
      return null;
    }

    return (
      <div className="settings-btn">
        <button className="btn-action btn btn-dark" onClick={ this.toggleSettings }>
          { !this.state.settingsShown ? <i className="fa fa-cog"/> : <i className="fa fa-times-circle"/> }
        </button>
        { this.state.settingsShown && <Settings/> }
      </div>
    );
  }

  render() {
    return (
      <>
        <div className='top-nav'>
          <button className="btn-action btn btn-dark d-none d-sm-block d-md-block d-lg-block d-xl-block" onClick={ this.props.onBack }><i className="fa fa-arrow-left"/></button>
          <button className="btn-action btn btn-dark d-none d-sm-block d-md-block d-lg-block d-xl-block" onClick={ this.props.onForward }><i className="fa fa-arrow-right"/></button>
          <button className="btn-action btn btn-dark" onClick={ this.props.onReload }><i className="fa fa-refresh"/></button>
          <input
            ref={ this.urlInput }
            className='search-input'
            type="text"
            placeholder='Enter the URL to load'
            value={ this.state.url }
            onChange={ this.onChange }
            onKeyPress={ this.onKeyPress }
            onFocus={ this.onFocus }
          />
          <button className="btn-action btn btn-danger btn-go" onClick={ () => this.props.onUrl('') }><i className='fa fa-times'/></button>
          { this.renderSettings() }
        </div>
      </>
    );
  }
}

NavBar.propTypes = {
  url: PropTypes.string.isRequired,
  onUrl: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

export default NavBar;
