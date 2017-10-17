import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import LoginPage from './loginPage';
import { login } from 'actions/creators';

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
