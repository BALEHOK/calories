import Immutable from 'seamless-immutable';
// window.Immutable = Immutable;
import Reducer from './baseReducer';
import * as actionTypes from 'actions/types';

class UsersReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = Immutable([]);

    this.actionMap = {
      [actionTypes.usersLoaded]: 'usersLoaded',
      [actionTypes.addUser]: 'addUser',
      [actionTypes.editUser]: 'editUser',
      [actionTypes.deleteUser]: 'deleteUser',
    };
  }

  usersLoaded(state, action) {
    return Immutable(action.payload);
  }

  addUser(state, action) {
    return state.concat(action.payload);
  }

  editUser(state, action) {
    const editedUser = action.payload;
    return state.map(u => u.id === editedUser.id ? editedUser : u);
  }

  deleteUser(state, action) {
    const deletedUserId = action.payload.id;
    return state.filter(u => u.id !== deletedUserId);
  }
}

export default new UsersReducer().getReducerFn();
