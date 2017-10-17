import React from 'react';
import IconButton from 'material-ui/IconButton';

export default ({ onClick, ...rest }) => {
  return (
    <IconButton {...rest} style={{ padding: 0, width: 24 }}
      iconClassName="material-icons"
      onClick={onClick}
    >
      delete_forever
    </IconButton>
  );
}
