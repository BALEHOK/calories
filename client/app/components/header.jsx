import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import drawerMenu from './drawerMenu';
import MenuItem from 'material-ui/MenuItem';

import { ajax } from 'common/ajax';

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      showDawer: false
    };
  }

  onLogin = () => {
    this.onDrawerNavigate('/login');
  }

  onLogout = () => {
    this.closeDrawer();
    this.props.logout();
  }

  onRegister = () => {
    this.onDrawerNavigate('/register');
  }

  onCaloriesList = () => {
    this.onDrawerNavigate('/');
  }

  onUsersList = () => {
    this.onDrawerNavigate('/users');
  }

  onDrawerNavigate = (url) => {
    this.closeDrawer();
    this.props.history.push(url);
  }

  toggleDrawer = () => this.setState({ showDawer: !this.state.showDawer });
  closeDrawer = () => this.setState({ showDawer: false });

  render() {
    const user = this.props.auth.user;

    let rightMenu;

    if (user) {
      rightMenu = (<FlatButton onTouchTap={this.onLogout} label="Log out" />);
    } else {
      rightMenu = (<FlatButton onTouchTap={this.onLogin} label="Log in" />);
    }

    return (
      <div>
        <AppBar
          title="Calories tracker"
          className="header"
          onLeftIconButtonTouchTap={this.toggleDrawer}
          iconElementRight={rightMenu}
        />
        <Drawer
          docked={false}
          open={this.state.showDawer}
          onRequestChange={(showDawer) => this.setState({ showDawer })}
        >
          {drawerMenu(
            user,
            this.onLogin,
            this.onRegister,
            this.onCaloriesList,
            this.onUsersList
          )}
        </Drawer>
      </div>
    );
  }
}


export default withRouter(Header);
