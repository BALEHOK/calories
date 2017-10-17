import Immutable from 'seamless-immutable';

import Reducer from './baseReducer';
import * as actionTypes from 'actions/types';

class AuthReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = Immutable({
      user: null,
      error: null
    });

    this.actionMap = {
      [actionTypes.loginFailed]: 'authError',
      [actionTypes.userInfoReceived]: 'userInfo',
    };
  }

  authError(state, action) {
    return Immutable.merge(state, {user: null, error: action.payload.error});
  }

  userInfo(state, action) {
    return Immutable.merge(state, {user: action.payload, error: null});
  }
}

export default new AuthReducer().getReducerFn();
