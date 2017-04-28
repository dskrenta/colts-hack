import React from 'react';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="headerOut">
        <div className="headerIn">
          <h1 className="logo">Trading<span>Rhino</span></h1>
          <button className="run"></button>
        </div>
      </div>
    );
  }
}
