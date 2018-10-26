import React, { Component } from 'react';
import style from './style.module.css';

class NavBar extends Component {
  render() {
    return (
      <div className={ style['nav-bar'] }>
        <h2>What is my name</h2>
      </div>
    );
  }
}

export default NavBar;
