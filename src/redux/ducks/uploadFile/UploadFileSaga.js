import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { UPLOAD_FILE } from "./UploadFileTypes";

import { uploadFileSuccess, uploadFileFailure } from "./UploadFileActions";

import api from "Api";

// const signInUserWithEmailPasswordRequest = async (email, password) => {
//   const result = await api.post("/users/login", {
//     email: email,
//     password: password
//   });
//   return result.data;
// };

const getUserAccessRightsRequest = async () => {
  const result = await api.get(`/accesssettings/user/accessRights`);
  return result.data;
};

function* uploadFile({ payload }) {
  const { file } = payload;

  try {
    const upload = yield call(getUserAccessRightsRequest, "123");

    yield put(uploadFileSuccess(error.response.data.error.message));
  } catch (error) {
    yield put(uploadFileFailure(error.response.data.error));
  }
}

export function* uploadFileFunc() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

export default function* rootSaga() {
  yield all([fork(uploadFileFunc)]);
}
