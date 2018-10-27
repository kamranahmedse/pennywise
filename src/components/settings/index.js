import React from 'react';
import './style.scss';

class Settings extends React.Component {
  render() {
    return (
      <div className='settings-wrap'>
        <div className="setting-controls">
          <div className="setting-control opacity-picker">
            <label htmlFor="opacity-picker"><i className="fa fa-lightbulb-o"></i></label>
            <input type="range" min="0" max="100" className="slider" id="opacity-picker"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
