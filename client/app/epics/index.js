import { combineEpics } from 'redux-observable';
import appEpics from './appEpics';
import authEpics from './authEpics';
import usersEpics from './usersEpics';
import mealsEpics from './mealsEpics';

export default combineEpics(
  appEpics,
  authEpics,
  usersEpics,
  mealsEpics,
);
