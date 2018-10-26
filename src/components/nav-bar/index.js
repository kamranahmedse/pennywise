import React, { Component } from 'react';
import './style.scss';

class NavBar extends Component {
  render() {
    return (
      <div className='top-nav'>
        <button className="btn btn-dark"><i className="fa fa-arrow-left"/></button>
        <button className="btn btn-dark"><i className="fa fa-arrow-right"/></button>
        <button className="btn btn-dark"><i className="fa fa-refresh"/></button>
        <div className="search-field">
          <input type="text" placeholder='Enter the URL to load'/>
        </div>
        <button className="btn btn-danger btn-go">
          Load URL
        </button>
      </div>
    );
  }
}

export default NavBar;