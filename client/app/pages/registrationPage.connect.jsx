import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegistrationPage from './registrationPage';
import { registerUser } from 'actions/creators';

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
