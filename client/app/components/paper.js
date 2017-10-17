import './paper.scss';

import React from 'react';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';

export default ({ children }) => {
  return (
    <Paper className="paper-wrapper" zDepth={1}>
      {children}
    </Paper>
  )
}
