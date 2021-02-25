/**
 * User Management Actions
 */
import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  ON_CHANGE_ADD_USER,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_START,
  ON_CHANGE_UPDATE_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ON_CHANGE_UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS,
  UPDATE_USER_RIGHTS_SUCCESS,
  GET_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from "./UserManagementTypes";

/**
 * GET All Users
 */
export const getAllUsers = (limit, skip, filter, searchText, orderBy) => ({
  type: GET_ALL_USERS,
  payload: { limit, skip, filter, searchText, orderBy }
});
export const getAllUsersSuccess = (users, settings) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: { users: users, settings: settings }
});

/**
 * ADD User
 */
export const onChangeAddUser = (field, value) => ({
  type: ON_CHANGE_ADD_USER,
  payload: { field, value }
});
export const addUser = (data, listOptions) => ({
  type: ADD_USER,
  payload:  { data,  listOptions }
});
export const addUserSuccess = (user, settings) => ({
  type: ADD_USER_SUCCESS,
  payload: { user, settings }
});
export const addUserFailure = err => ({
  type: ADD_USER_FAILURE,
  payload: err
});

/**
 * UPDATE User
 */
export const updateUserStart = user => ({
  type: UPDATE_USER_START,
  payload: user
});
export const onChangeUpdateUser = (field, value) => ({
  type: ON_CHANGE_UPDATE_USER,
  payload: { field, value }
});
export const updateUser = (data, listOptions) => ({
  type: UPDATE_USER,
  payload: { data, listOptions }
});
export const updateUserSuccess = (user, settings) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user, settings }
});
export const updateUserFailure = err => ({
  type: UPDATE_USER_FAILURE,
  payload: err
});
export const onChangeUpdateUserRights = rights => ({
  type: ON_CHANGE_UPDATE_USER_RIGHTS,
  payload: rights
});
export const updateUserRights = () => ({
  type: UPDATE_USER_RIGHTS
});
export const updateUserRightsSuccess = userRights => ({
  type: UPDATE_USER_RIGHTS_SUCCESS,
  payload: userRights
});

/**
 * GET User Failure
 */
export const getUserFailure = err => ({
  type: GET_USER_FAILURE,
  payload: err
});

export const deleteUser = (data, listOptions) => ({
  type: DELETE_USER,
  payload:  {data, listOptions}
});

export const deleteUserFailure = err => ({
  type: DELETE_USER_FAILURE,
  payload: err
});
