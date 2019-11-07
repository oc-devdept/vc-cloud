import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  LOGIN_USER,
  LOGOUT_USER,
  USER_RIGHTS,
  UPDATE_CURRENT_USER,
  UPDATE_PASSWORD
} from "./AuthTypes";

import {
  signinUserSuccess,
  signinUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  userRightsSuccess,
  userRightsFailure,
  updateCurrentUserSuccess,
  updateCurrentUserFailure,
  updatePasswordSuccess,
  updatePasswordFailure
} from "./AuthActions";

import Auth from "Auth";
import api from "Api";

/**
 * Login User
 */
const signInUserWithEmailPasswordRequest = async (email, password) => {
  const result = await api.post("/users/login", {
    email: email,
    password: password
  });
  return result.data;
};
const getUserProfileRequest = async userID => {
  const result = await api.get(`/users/${userID}`, userID);
  return result.data;
};

function* signInUserWithEmailPassword({ payload }) {
  const { emailAddress, password } = payload.user;
  const { history } = payload;

  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      emailAddress,
      password
    );

    if (signInUser.id) {
      localStorage.setItem("user_id", signInUser.userId);
      localStorage.setItem("accessKey", signInUser.id);
      const userRights = yield call(getUserAccessRightsRequest);
      const userInfo = yield call(getUserProfileRequest, signInUser.userId);
      new Auth().setSession(signInUser);
      yield put(signinUserSuccess(signInUser, userRights, userInfo));
      history.push("/");
      //Get User Access Rights
    } else {
      yield put(signinUserFailure(error.response.data.error.message));
    }
  } catch (error) {
    yield put(signinUserFailure(error.response.data.error));
  }
}

/**
 * Get User rights
 */
const getUserAccessRightsRequest = async () => {
  const result = await api.get(`/accesssettings/user/accessRights`);
  return result.data.data;
};
function* getUserRights() {
  try {
    const userRights = yield call(getUserAccessRightsRequest);
    let userid = localStorage.getItem("user_id");
    const userInfo = yield call(getUserProfileRequest, userid);
    yield put(userRightsSuccess(userRights, userInfo));
  } catch (error) {
    yield put(userRightsFailure(error.response.data.error));
  }
}

/**
 * Log out user
 */
const logoutUserWithAccessToken = async () => {
  const result = await api.post(`/users/logout`);
  return result.data;
};
function* logoutUser({}) {
  try {
    yield call(logoutUserWithAccessToken);
    yield put(logoutUserSuccess());
    new Auth().logout();
  } catch (error) {
    yield put(logoutUserFailure());
  }
}

/**
 * Update current user
 */
const updateCurrentUserRequest = async data => {
  const result = await api.patch(`users/${data.id}`, data);
  return result.data;
};
function* updateCurrentUser({ payload }) {
  try {
    const data = yield call(updateCurrentUserRequest, payload);
    yield put(updateCurrentUserSuccess(data));
  } catch (error) {
    yield put(updateCurrentUserFailure(error));
  }
}

/**
 * Update Password
 */
const updateUserPassword = async (oldPassword, newPassword) => {
  await api.post(`/users/change-password`, {
    oldPassword: oldPassword,
    newPassword: newPassword
  });
  return true;
};
function* updatePasswordToDB({ payload }) {
  try {
    const data = yield call(
      updateUserPassword,
      payload.oldPassword,
      payload.newPassword
    );
    yield put(updatePasswordSuccess(data));
  } catch (err) {
    yield put(updatePasswordFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* signinUserWatcher() {
  yield takeEvery(LOGIN_USER, signInUserWithEmailPassword);
}
export function* signoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}
export function* getAccessRights() {
  yield takeEvery(USER_RIGHTS, getUserRights);
}
export function* updateCurrentUserWatcher() {
  yield takeEvery(UPDATE_CURRENT_USER, updateCurrentUser);
}
export function* updatePasswordWatcher() {
  yield takeEvery(UPDATE_PASSWORD, updatePasswordToDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(signinUserWatcher),
    fork(signoutUser),
    fork(getAccessRights),
    fork(updateCurrentUserWatcher),
    fork(updatePasswordWatcher)
  ]);
}
