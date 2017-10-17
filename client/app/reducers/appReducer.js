import Immutable from 'seamless-immutable';

import Reducer from './baseReducer';
import * as actionTypes from 'actions/types';

class AppReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = Immutable({
      isInitialized: false,
    });

    this.actionMap = {
      [actionTypes.appInitialized]: 'appInitialized',
    };
  }

  appInitialized(state, action) {
    return Immutable.merge(state, {isInitialized: true});
  }
}

export default new AppReducer().getReducerFn();
