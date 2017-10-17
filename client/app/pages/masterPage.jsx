import React from 'react';
import { Link } from 'react-router';

import Header from 'components/header.connect';

export default class MasterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
