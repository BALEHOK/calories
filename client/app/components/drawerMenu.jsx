import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import userRoles from 'common/userRoles';

export default function drawerMenu(user, onLogin, onRegister, onCaloriesList, onUsersList) {
  if (!user) {
    return [
      <MenuItem key="login" onTouchTap={onLogin}>Log in</MenuItem>,
      <MenuItem key="registration" onTouchTap={onRegister}>Register</MenuItem>
    ];
  }

  const drawerItems = [
    <MenuItem key="username">{user.name}</MenuItem>,
    <MenuItem key="caloriesList" onTouchTap={onCaloriesList}>Calories list</MenuItem>
  ];

  if (user.role & (userRoles.manager | userRoles.admin)){
    drawerItems.push(<MenuItem key="usersList" onTouchTap={onUsersList}>Users management</MenuItem>);
  }

  return drawerItems;
}
