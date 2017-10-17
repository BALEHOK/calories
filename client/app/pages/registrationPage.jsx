import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import PageTitle from 'components/pageTitle';
import Paper from 'components/paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const emailRegexp = /.+@.+\..+/;

export default class RegistrationPage extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      userRegistered: false,
      userName: '',
      userEmail: '',
      userEmailError: '',
      userPassword: '',
      userPasswordError: '',
    }
  }

  userEditName = (event, value) => {
    this.setState({ userName: value });
  }

  userEditEmail = (event, value) => {
    let errorText, validationError;
    if (!value) {
      errorText = 'Email is required';
    } else if (!emailRegexp.test(value)) {
      errorText = 'Enter a valid email address';
    } else {
      errorText = '';
    }

    this.setState({
      userEmail: value,
      userEmailError: errorText
    });
  }

  userEditPassword = (event, value) => {
    const errorText = !!value ? '' : 'Password is required';
    this.setState({
      userPassword: value,
      userPasswordError: errorText
    });
  }

  registerUser = (e) => {
    e.preventDefault();

    const s = this.state;
    if (s.userEmailError || s.userPasswordError) {
      return;
    }

    this.props.registerUser({
      name: s.userName || s.userEmail,
      email: s.userEmail,
      password: s.userPassword
    });

    this.setState({ userRegistered: true });
  }

  render() {
    const s = this.state;

    return (
      <DocumentTitle title="Registration">
        <div className="container registration">
          <PageTitle title="Registration" />
          <Paper>
            <form>
              <div className="user-edit-dialog_edit-field">
                <TextField
                  floatingLabelText="Name"
                  value={s.userName}
                  onChange={this.userEditName}
                />
              </div>
              <div className="user-edit-dialog_edit-field">
                <TextField
                  floatingLabelText="Email"
                  required
                  errorText={s.userEmailError}
                  value={s.userEmail}
                  onChange={this.userEditEmail}
                />
              </div>
              <div className="user-edit-dialog_edit-field">
                <TextField
                  floatingLabelText="Password"
                  required
                  errorText={s.userPasswordError}
                  type="password"
                  value={s.userPassword}
                  onChange={this.userEditPassword}
                />
              </div>
              <div>
                <RaisedButton
                  label="Register"
                  primary
                  type="submit"
                  disabled={!!(s.userEmailError || s.userPasswordError)}
                  onClick={this.registerUser}
                />
              </div>
            </form>
          </Paper>
          {s.userRegistered
            ? (
              <Paper>
                <p>Check your email box and follow the activation link</p>
              </Paper>
            ) : (
              null
            )}
        </div>
      </DocumentTitle>
    );
  }
}
