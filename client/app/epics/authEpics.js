import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { ajax, ajaxConfig } from 'common/ajax';

import * as actionTypes from 'actions/types';
import * as actionCreators from 'actions/creators';

const getUserInfoEpic = (action$) =>
  action$.ofType(actionTypes.getUserInfo)
    .mergeMap(getProfile)
    .catch(e => Observable.of(null))
    .map(user => actionCreators.userInfoReceived(user));

const loginEpic = (action$) =>
  action$.ofType(actionTypes.login)
    .mergeMap((action) => {
      const {username, password} = action.payload;
      ajaxConfig({accessToken: null});
      const basicToken = btoa(`${username}:${password}`);

      return ajax.get('/auth/token', null, {Authorization: `Basic ${basicToken}`})
        .then(r => r.json())
        .then(authInfo => {
          if (authInfo && authInfo.accessToken) {
            ajaxConfig({accessToken: authInfo.accessToken});
            return getProfile();
          }

          return null;
        })
        .catch(() => null);
    })
    .map(user => user
      ? actionCreators.userInfoReceived(user)
      : actionCreators.loginFailed('Wrong credentials'));

const logoutEpic = (action$) =>
  action$.ofType(actionTypes.logout)
    .mergeMap(() =>
      ajax.get('/auth/logout').then(() => ajaxConfig({accessToken: null}))
    )
    .mapTo(actionCreators.userInfoReceived(null));

const registerUserEpic = (action$) =>
  action$.ofType(actionTypes.registerUser)
    .mergeMap((action) =>
      ajax.post('/profile/register', action.payload)
    )
    .mapTo(actionCreators.noActionRequired());

export default combineEpics(
  loginEpic,
  logoutEpic,
  getUserInfoEpic,
  registerUserEpic,
);

function getProfile(){
  return ajax.get('/profile')
    .then(r => r.json())
    .catch(() => null);
}
