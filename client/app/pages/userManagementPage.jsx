import './userManagementPage.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import PageTitle from 'components/pageTitle';
import DeleteButton from 'components/deleteButton';

import roles from 'common/userRoles';

export default class UserManagementPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    loadUsers: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      dialogUser: {},
      snackOpen: false,
      snackMessage: ''
    };

    this.dialogActions = [
      <FlatButton
        label="Cancel"
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={this.saveUser}
      />,
    ];
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  onAddUserClick = () => {
    const newUser = {
      name: '',
      email: '',
      role: roles.user,
      isActivated: false,
      isBlocked: false,
    };

    this.setState({
      dialogForEdit: false,
      dialogOpen: true,
      dialogUser: newUser
    });
  }

  onUserRowClick = (rowIndex) => {
    this.setState({
      dialogForEdit: true,
      dialogOpen: true,
      dialogUser: this.props.users[rowIndex].asMutable({ deep: true })
    });
  }

  userEditName = (event, value) => {
    this.userEdit({ name: value });
  }

  userEditEmail = (event, value) => {
    this.userEdit({ email: value });
  }

  userEditPassword = (event, value) => {
    this.userEdit({ password: value });
  }

  userEditRole = (event, index, value) => {
    this.userEdit({ role: value });
  }

  userEditIsActivated = (event, value) => {
    this.userEdit({ isActivated: value });
  }

  userEditIsBlocked = (event, value) => {
    this.userEdit({ isBlocked: value });
  }

  deleteUser = (event, user) => {
    event.stopPropagation();

    if (this.props.auth.user.id === user.id) {
      this.openSnack('Can\'t delete current user');
      return;
    }

    this.props.deleteUser(user);
  }

  userEdit = (updatedProp) => {
    this.setState({
      dialogUser: Object.assign(this.state.dialogUser, updatedProp)
    });
  }

  saveUser = () => {
    const s = this.state;
    if (s.dialogForEdit) {
      this.props.editUser(s.dialogUser);
    } else {
      this.props.addUser(s.dialogUser);
    }

    this.closeDialog();
  }

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  openSnack = (message) => {
    this.setState({
      snackOpen: true,
      snackMessage: message
    });
  };

  closeSnack = () => {
    this.setState({
      snackOpen: false
    });
  };

  render() {
    const s = this.state;
    const { dialogForEdit, dialogOpen, dialogUser } = s;

    return (
      <DocumentTitle title="Users management">
        <div className="container user-management">
          <PageTitle title="Users management" />

          <div className="row users-list">
            <Table
              selectable={false}
              onCellClick={this.onUserRowClick}
            >
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn width="30%">ID</TableHeaderColumn>
                  <TableHeaderColumn width="15%">Name</TableHeaderColumn>
                  <TableHeaderColumn width="21%">Email</TableHeaderColumn>
                  <TableHeaderColumn width="10%">Role</TableHeaderColumn>
                  <TableHeaderColumn width="8%">Activated</TableHeaderColumn>
                  <TableHeaderColumn width="8%">Blocked</TableHeaderColumn>
                  <TableHeaderColumn width="8%"></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
                stripedRows
              >
                {this.props.users.map((u, i) => (
                  <TableRow key={u.id || `new${i}`}>
                    <TableRowColumn width="30%">{u.id}</TableRowColumn>
                    <TableRowColumn width="15%">{u.name}</TableRowColumn>
                    <TableRowColumn width="21%">{u.email}</TableRowColumn>
                    <TableRowColumn width="10%">{roles[u.role]}</TableRowColumn>
                    <TableRowColumn width="8%">
                      <Checkbox
                        checked={u.isActivated}
                      />
                    </TableRowColumn>
                    <TableRowColumn width="8%">
                      <Checkbox
                        checked={u.isBlocked}
                      />
                    </TableRowColumn>
                    <TableRowColumn width="8%">
                      <DeleteButton
                        className="user-management_delete-user"
                        onClick={e => this.deleteUser(e, m)}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="row user-management_add-user">
            <RaisedButton
              label="Add"
              primary
              onClick={this.onAddUserClick}
            />
          </div>

          <Dialog
            title={dialogForEdit ? 'Edit user' : 'Add user'}
            actions={this.dialogActions}
            modal={false}
            open={dialogOpen}
            onRequestClose={this.closeDialog}
          >
            {dialogUser.id ? (
              <div>Id: {dialogUser.id}</div>
            ) : null}
            <div className="user-edit-dialog_edit-field">
              <TextField
                floatingLabelText="Name"
                value={dialogUser.name}
                onChange={this.userEditName}
              />
            </div>
            <div className="user-edit-dialog_edit-field">
              <TextField
                floatingLabelText="Email"
                value={dialogUser.email}
                onChange={this.userEditEmail}
              />
            </div>
            <div className="user-edit-dialog_edit-field">
              {dialogForEdit
                ? (
                  <TextField
                    hintText="Type in new password"
                    floatingLabelFixed
                    floatingLabelText="Password"
                    hintText="Type in new password"
                    type="password"
                    value={dialogUser.password}
                    onChange={this.userEditPassword}
                  />
                ) : (
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    value={dialogUser.password}
                    onChange={this.userEditPassword}
                  />
                )
              }
            </div>
            <div className="user-edit-dialog_edit-field">
              <SelectField
                floatingLabelText="Role"
                value={dialogUser.role}
                onChange={this.userEditRole}
              >
                <MenuItem value={roles.user} primaryText="user" />
                <MenuItem value={roles.manager} primaryText="manager" />
                <MenuItem value={roles.admin} primaryText="admin" />
              </SelectField>
            </div>
            <div className="user-edit-dialog_edit-field">
              <Toggle
                label="Activated"
                toggled={dialogUser.isActivated}
                onToggle={this.userEditIsActivated}
              />
            </div>
            <div className="user-edit-dialog_edit-field">
              <Toggle
                label="Blocked"
                toggled={dialogUser.isBlocked}
                onToggle={this.userEditIsBlocked}
              />
            </div>
          </Dialog>

          <Snackbar
            open={s.snackOpen}
            message={s.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.closeSnack}
          />
        </div>
      </DocumentTitle>
    );
  }
}
