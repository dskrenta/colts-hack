import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title logo">Trading<span>Rhino</span></span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" for="search">
                <i className="material-icons">play_circle_filled</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search"/>
                <label className="mdl-textfield__label" for="search">Enter your query...</label>
              </div>
            </div>
          </div>
        </header>
        <div className="mdl-grid">
          <div className="bodyHeight mdl-cell mdl-cell--6-col mdl-grid cardShadow">
            <div className="editorCont">
              <AceEditor
                mode="javascript"
                theme="github"
                name="editor"
                editorProps={{$blockScrolling: true}}
              />
            </div>
          </div>
          <div className="bodyHeight mdl-cell mdl-cell--6-col noMar">
            <div className="halfHeight mdl-cell mdl-cell--12-col cardShadow">

            </div>
            <div className="halfHeight mdl-cell mdl-cell--12-col cardShadow">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
