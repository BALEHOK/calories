import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Paper from 'components/paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router'
import PageTitle from 'components/pageTitle';

class LoginPage extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      prestine: true,
      username: '',
      password: '',
      usernameInvalid: false,
      passwordInvalid: false
    }
  }

  componentDidMount() {
    this.redirectIfLoggedin(this.props.auth);
  }

  componentWillReceiveProps(next) {
    this.redirectIfLoggedin(next.auth);
  }

  redirectIfLoggedin(auth) {
    if (auth.user) {
      this.props.history.replace('/');
    }
  }

  onUsernameChange = (e) => {
    const v = e.target.value;
    if (v) {
      this.setState({
        username: v,
        usernameInvalid: false
      });
    } else {
      this.setState({
        username: '',
        usernameInvalid: true
      });
    }
  }


  onPasswordChange = (e) => {
    const v = e.target.value;
    if (v) {
      this.setState({
        password: v,
        passwordInvalid: false
      });
    } else {
      this.setState({
        password: '',
        passwordInvalid: true
      });
    }
  }

  onLogin = (e) => {
    e.preventDefault();

    const username = this.state.username;
    if (!username) {
      this.setState({ usernameInvalid: true });
    }

    const password = this.state.password;
    if (!password) {
      this.setState({ passwordInvalid: true });
    }

    if (!username || !password) {
      return;
    }

    this.props.login(username, password);

    this.setState({ prestine: false });
  }

  render() {
    const s = this.state;
    const authError = this.props.auth.error;
    return (
      <DocumentTitle title={'Login'}>
        <div className="container">
          <PageTitle title="Login" />
          <Paper>
            {!s.prestine && authError && (
              <div className="row">
                <div className="col-xs-12">
                  <div className="alert alert-danger" role="alert">{authError}</div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-xs-12">
                <form>
                  <TextField
                    errorText={s.usernameInvalid ? 'Username is required' : ''}
                    floatingLabelText="Email"
                    value={s.username}
                    onChange={this.onUsernameChange}
                  />
                  <br />
                  <TextField
                    errorText={s.passwordInvalid ? 'Password is required' : ''}
                    floatingLabelText="Password"
                    type="password"
                    value={s.password}
                    onChange={this.onPasswordChange}
                  />
                  <br />
                  <RaisedButton label="Log in" primary type="submit" onClick={this.onLogin} />
                </form>
              </div>
            </div>
          </Paper>
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter(LoginPage);
