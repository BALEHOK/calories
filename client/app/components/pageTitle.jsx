import React from 'react';
import classnames from 'classnames';

export default ({ className, title }) => {
  return (
    <div className={classnames('page-title', className)}>
      <h4>{title}</h4>
    </div>
  )
}
