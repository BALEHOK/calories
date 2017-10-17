import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppComponent from './app';
import { initializeApp } from 'actions/creators';

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeApp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
