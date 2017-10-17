import { combineEpics } from 'redux-observable';

import authEpics from './authEpics';

import * as actionTypes from 'actions/types';
import * as actionCreators from 'actions/creators';

const initializeAppEpic = (action$, store) =>
  action$.ofType(actionTypes.initializeApp)
    .mapTo(actionCreators.getUserInfo());

const initializedAppEpic = (action$, store) =>
  action$.ofType(actionTypes.userInfoReceived)
    .map(() => !store.getState().app.isInitialized
      ? actionCreators.appInitialized()
      : actionCreators.noActionRequired()
    );

export default combineEpics(
  initializeAppEpic,
  initializedAppEpic
);
