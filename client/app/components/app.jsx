import './app.scss';

import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import NavigationRouter from 'components/navigationRouter';
import Loader from 'components/loader';

export default class AppComponent extends React.PureComponent {
  static propTypes = {
    app: PropTypes.object.isRequired,
    initializeApp: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    props.initializeApp();
  }

  render() {
    return (
      <DocumentTitle title="Calories tracker">
        <div>
          {this.props.app.isInitialized
            ? <NavigationRouter />
            : <Loader />
          }
        </div>
      </DocumentTitle>
    );
  }
}
