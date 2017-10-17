import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserManagementPage from './userManagementPage';
import { loadUsers, addUser, editUser, deleteUser } from 'actions/creators';

function mapStateToProps(state) {
  return { auth: state.auth, users: state.users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadUsers, addUser, editUser, deleteUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);
