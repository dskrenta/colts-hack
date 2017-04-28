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
        <div className="mdl-grid">
          <div className="bodyHeight mdl-cell mdl-cell--6-col mdl-grid cardShadow">
            <Code />
          </div>
          <div className="bodyHeight mdl-cell mdl-cell--6-col noMar">
            <div className="halfHeight mdl-cell mdl-cell--12-col cardShadow">
              <Graph />
            </div>
            <div className="halfHeight mdl-cell mdl-cell--12-col cardShadow">
              <Logs />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
