import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Pennywise } from '../../icons/pennywise.svg';
import './style.scss';

class EmptyPage extends React.Component {
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onUrl(e.target.value);
    }
  };

  onFileChange = (e) => {
    this.props.onFile(document.getElementById("#myFile").files[0].path)
    //console.log(document.getElementById("#myFile").files[0].path)
  }

  render() {
    return (
      <div className='empty-page'>
        <Pennywise/>
        <h1>Pennywise</h1>
        <p>Enter the URL below to get started – I will float it for you</p>
        <input type="text" placeholder="Enter a URL you would like to see float" onKeyPress={ this.onKeyPress } autoFocus/>
        <input id="#myFile" type="file" onChange={this.onFileChange}/>
      </div>
    );
  }
}

EmptyPage.propTypes = {
  onUrl: PropTypes.func.isRequired,
  onFile: PropTypes.func.isRequired
};

export default EmptyPage;
