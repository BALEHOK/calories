import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { ajax, ajaxConfig } from 'common/ajax';

import * as actionTypes from 'actions/types';
import * as actionCreators from 'actions/creators';

const getUsersEpic = (action$) =>
  action$.ofType(actionTypes.loadUsers)
    .mergeMap(() => ajax.get('/users').then(r => r.json()))
    .catch(() => Observable.of([]))
    .map(actionCreators.usersLoaded);

const addUserEpic = (action$) =>
  action$.ofType(actionTypes.addUser)
    .mergeMap((action) => ajax.post('/users', action.payload))
    .catch((er) => Observable.of(er))
    .map(actionCreators.loadUsers);

const editUserEpic = (action$) =>
  action$.ofType(actionTypes.editUser)
    .mergeMap((action) => ajax.put('/users', action.payload))
    .catch((er) => Observable.of(er))
    .map(actionCreators.loadUsers);

const deleteUserEpic = (action$) =>
  action$.ofType(actionTypes.deleteUser)
    .mergeMap((action) => ajax.delete(`/users/${action.payload.id}`))
    .catch((er) => Observable.of(er))
    .map(actionCreators.loadUsers);

export default combineEpics(
  getUsersEpic,
  addUserEpic,
  editUserEpic,
  deleteUserEpic
);
