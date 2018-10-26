import React, { Component } from 'react';
import './style.scss';

class NavBar extends Component {
  render() {
    return (
      <div className='top-nav'>
        <a href="#" className="btn btn-dark"><i className="fa fa-arrow-left"></i></a>
        <a href="#" className="btn btn-dark"><i className="fa fa-arrow-right"></i></a>
        <a href="#" className="btn btn-dark"><i className="fa fa-refresh"></i></a>
        <div className="search-field">
          <input type="text" placeholder='Enter the URL to load'/>
        </div>
        <a href="#" className="btn btn-danger btn-go">
          Load URL
        </a>
      </div>
    );
  }
}

export default NavBar;