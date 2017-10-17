import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Header from './header';
import { getUserInfo, logout } from 'actions/creators';

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
