import * as actionTypes from './types';

export const noActionRequired = () => ({
  type: actionTypes.noActionRequired
});

// app
export const initializeApp = () => ({
  type: actionTypes.initializeApp
});
export const appInitialized = () => ({
  type: actionTypes.appInitialized
});

// users management
export const loadUsers = () => ({
  type: actionTypes.loadUsers
});
export const usersLoaded = (users) => ({
  type: actionTypes.usersLoaded,
  payload: users
});
export const editUser = (user) => ({
  type: actionTypes.editUser,
  payload: user
});
export const addUser = (user) => ({
  type: actionTypes.addUser,
  payload: user
});
export const deleteUser = (user) => ({
  type: actionTypes.deleteUser,
  payload: user
});

// meals management
export const loadMeals = (skip, limit, userId) => ({
  type: actionTypes.loadMeals,
  payload: {skip, limit, userId}
});
export const mealsLoaded = (meals) => ({
  type: actionTypes.mealsLoaded,
  payload: meals
});
export const editMeal = (meal) => ({
  type: actionTypes.editMeal,
  payload: meal
});
export const addMeal = (meal) => ({
  type: actionTypes.addMeal,
  payload: meal
});
export const deleteMeal = (meal) => ({
  type: actionTypes.deleteMeal,
  payload: meal
});
export const filterMeals = (filter) => ({
  type: actionTypes.filterMeals,
  payload: filter
});

// auth
export const login = (username, password) => ({
  type: actionTypes.login,
  payload: {username, password}
});
export const loginFailed = (resp) => ({
  type: actionTypes.loginFailed,
  payload: resp
});
export const logout = () => ({
  type: actionTypes.logout
});

// profile
export const getUserInfo = () => ({
  type: actionTypes.getUserInfo
});
export const userInfoReceived = (user) => ({
  type: actionTypes.userInfoReceived,
  payload: user
});
export const registerUser = (user) => ({
  type: actionTypes.registerUser,
  payload: user
});
