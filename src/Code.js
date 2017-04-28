import React from 'react';
import './Code.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

const defaultAlgo = `let prevSarHigher = false;
const bt = new Backtest(this.marketData, 5, 0.90);
bt.setTradingLogic(bar => {
  if (bt.getCurrentLongPosition) {
    bt.clearStop();
    bt.longStop(bar.SAR);
  } else if (bt.getCurrentShortPosition) {
    bt.clearStop();
    bt.shortStop(bar.SAR);
  }
  if (bar.SAR > bar.high && bar.SAR > bar.low) {
    if (!prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      if (bt.getCurrentLongPosition) {
        bt.clearStop();
        bt.closeLong(bar);
      }
      bt.openShort(bar);
      bt.shortStop(bar.SAR);
    }
  } else {
    if (prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      if (bt.getCurrentShortPosition) {
        bt.clearStop();
        bt.closeShort(bar);
      }
      bt.openLong(bar);
      bt.longStop(bar.SAR);
    }
  }
});
`;

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.defaultA
  }

  getCode = (event) => {
    console.log(event);
  };

  render() {
    return(
      <div className="editorCont">
        <AceEditor
          mode="javascript"
          theme="github"
          name="editor"
          onChange={this.getCode}
          editorProps={{$blockScrolling: true}}
          defaultValue={defaultAlgo}
        />
      </div>
    );
  }
}
