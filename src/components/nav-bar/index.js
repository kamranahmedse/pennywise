import React, { Component } from 'react';
import './style.scss';

class NavBar extends Component {
  render() {
    return (
      <div className='top-nav'>
        <i className="fa fa-search"/>
        <input type="text" placeholder='Enter the URL to load'/>
        <a href="#" className="btn btn-danger btn-go">
          Load URL
        </a>
      </div>
    );
  }
}

export default NavBar;