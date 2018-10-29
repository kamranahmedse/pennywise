import React from 'react';
import debounce from 'lodash.debounce';

import './style.scss';

const { ipcRenderer } = window.require('electron');

class Settings extends React.Component {
  state = {
    opacity: ipcRenderer.sendSync('opacity.get')
  };

  componentWillMount() {
    window.addEventListener("keypress", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = e => {
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        minus = 189,
        plus = 187,
        opacity = this.state.opacity,
        evtobj = window.event? event : e;
    
    if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = true;
    
    if (evtobj.keyCode === minus && ctrlDown) {
      this.reduceOpacity(opacity - 10);
    }
    if (evtobj.keyCode === plus && ctrlDown) {
      this.increaseOpacity(opacity + 10);
    }
  }

  reduceOpacity = value => {
    if (value < 20) {
      this.setState({
        opacity: 20
      });
      
      this.setOpacity(20);
    } else {
      this.setState({
        opacity: value
      });
      
      this.setOpacity(value);
    }
  };

  increaseOpacity = value => {
    if (value > 100) {
      this.setState({
        opacity: 100
      });
      
      this.setOpacity(100);
    } else {
      this.setState({
        opacity: value
      });
      
      this.setOpacity(value);
    }
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
