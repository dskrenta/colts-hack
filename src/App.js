import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from './Header.js';
import Code from './Code.js';
import Graph from './Graph.js';
import Logs from './Logs.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Code />
        <Graph />
        <Logs />
      </div>
    );
  }
}
