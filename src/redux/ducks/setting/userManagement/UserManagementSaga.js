import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_USERS,
  ADD_USER,
  UPDATE_USER,
  GET_USER_PROFILE,
  UPDATE_USER_RIGHTS,
  DELETE_USER
} from "./UserManagementTypes";
import {
  getAllUsersSuccess,
  addUserSuccess,
  addUserFailure,
  updateUserSuccess,
  updateUserFailure,
  getUserProfileSuccess,
  getUserFailure,
  updateUserRightsSuccess,
  deleteUserFailure
} from "./UserManagementActions";
import {
  getAllRolesSuccess
} from "../roles/RolesActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllUsersRequest = async ({ limit, skip, filter, searchText, orderBy }) => {
  // console.log()
  const result = await api.post('/users/getall', { limit, skip, filter, searchText, orderBy });
  return result.data;
};

const getAllSettingsRequest = async (userIds) => {
  const result = await api.post("/accesssettings/viewall", { users: userIds });
  return result.data.data;
};
const getAllRolesRequest = async () => {
  const result = await api.post(`/accessroles/viewall`);
  return result.data.data;
  // return bestCase;
};

const addUserRequest = async newUser => {
  const result = await api.post("/users", newUser);
  return result.data;
};
const updateUserRequest = async (id, user) => {
  const result = await api.patch(`/users/${id}`, user);
  return result.data;
};
const getUserProfileRequest = async userID => {
  const result = await api.get(`/users/${userID}`, userID);
  return result.data;
};

const updateUserRights = async (userId, rights) => {
  const result = await api.post("/accesssettings/saveUserRights", {
    saveUserId: userId,
    rights: rights
  });
  return result.data;
};

const deleteUserRequest = async (userId) => {
  const result = await api.delete(`/users/${userId}`);
  return result.data;
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllUsersFromDB({ payload }) {
  try {
    const data = yield call(getAllUsersRequest, payload);
    // console.log(data);
    let userIds = data.data.map(val => val.id);
    const settings = yield call(getAllSettingsRequest, userIds);
    const roles = yield call(getAllRolesRequest);
    yield put(getAllUsersSuccess(data, settings));
    yield put(getAllRolesSuccess(roles));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}
function* addUserToDB({ payload }) {
  const { data, listOptions } = payload;
  const { selectedRoles, confirmPassword, roles, ...others } = data;
  try {
    var userdata = [];
    for (const role of selectedRoles) {
      userdata.push(role);
    }
    const data = yield call(addUserRequest, { ...others });
    yield call(updateUserRights, data.id, userdata);
    const settings = yield call(getAllSettingsRequest, [data.id]);
    yield put(addUserSuccess(data, settings));
  } catch (err) {
    console.log(err);
    yield put(addUserFailure(err));
  }
}
function* updateUserToDB({ payload }) {
  const { data, listOptions } = payload;
  const { selectedRoles, confirmPassword, password, roles, id, ...others } = data;
  try {
    var userdata = [];
    for (const role of selectedRoles) {
      userdata.push(role);
    }
    const data = yield call(updateUserRequest, id, { ...others });
    yield call(updateUserRights, id, userdata);
    const userlist = yield call(getAllUsersRequest, listOptions);
    let userIds = userlist.data.map(val => val.id);
    const settings = yield call(getAllSettingsRequest, userIds);
    yield put(getAllUsersSuccess(userlist, settings));
  } catch (err) {
    console.log(err);
    yield put(updateUserFailure(err));
  }
}
function* getUserProfileFromDB({ payload }) {
  try {
    const data = yield call(getUserProfileRequest, payload);
    yield put(getUserProfileSuccess(data));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}
function* updateUserRightsToDB() {
  const getUserSettings = state => state.usersState.userSettings;
  const user = yield select(getUserSettings);
  try {
    const data = yield call(updateUserRights, user.userid, user.groups);
    yield put(updateUserRightsSuccess(data));
  } catch (err) {
    yield put(updateUserFailure(err));
  }
}

function* deleteUserFromDB({ payload }) {
  try {
    const { data, listOptions } = payload;
    yield call(deleteUserRequest, data);
    const userlist = yield call(getAllUsersRequest, listOptions);
    let userIds = userlist.data.map(val => val.id);
    const settings = yield call(getAllSettingsRequest, userIds);
    yield put(getAllUsersSuccess(userlist, settings));
  }
  catch (err) {
    yield put(deleteUserFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllUsersWatcher() {
  yield takeEvery(GET_ALL_USERS, getAllUsersFromDB);
}
export function* addUserWatcher() {
  yield takeEvery(ADD_USER, addUserToDB);
}
export function* updateUserWatcher() {
  yield takeEvery(UPDATE_USER, updateUserToDB);
}
export function* getUserProfileWatcher() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileFromDB);
}
export function* updateUserRightsWatcher() {
  yield takeEvery(UPDATE_USER_RIGHTS, updateUserRightsToDB);
}
export function* deleteUserWatcher() {
  yield takeEvery(DELETE_USER, deleteUserFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    ,
    fork(getAllUsersWatcher),
    fork(addUserWatcher),
    fork(updateUserWatcher),
    fork(getUserProfileWatcher),
    fork(updateUserRightsWatcher),
    fork(deleteUserWatcher)
  ]);
}