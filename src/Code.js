import React from 'react';
import './Code.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

export default class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="editorCont">
        <AceEditor
          mode="javascript"
          theme="github"
          name="editor"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}
