import React from 'react';
import debounce from 'lodash.debounce';

import './style.scss';

const { ipcRenderer } = window.require('electron');

class Settings extends React.Component {
  state = {
    opacity: ipcRenderer.sendSync('opacity.get')
  };

  setOpacity = debounce((opacity) => {
    ipcRenderer.send('opacity.set', opacity);
  }, 500);

  onOpacityChange = (e) => {
    this.setState({
      opacity: e.target.value
  });

    this.setOpacity(e.target.value);
  };

  render() {
    return (
      <div className='settings-wrap'>
        <div className="setting-controls">
          <div className="setting-control opacity-picker">
            <label htmlFor="opacity-picker"><i className="fa fa-lightbulb-o"/></label>
            <input type="range" onChange={ this.onOpacityChange } value={ this.state.opacity } min="20" max="100" className="slider" id="opacity-picker"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
