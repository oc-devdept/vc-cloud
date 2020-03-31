import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as types from "./RentalTypes";
import * as actions from "./RentalActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getRentalRequest = async () => {
  const result = await api.get(`/rentalCars`);
  return result.data;
};
const createRentalRequest = async data => {
  const result = await api.post(`/rentalCars`, data);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getRental() {
  try {
    const data = yield call(getRentalRequest);
    yield put(actions.getRentalCarSuccess(data));
  } catch (error) {
    yield put(actions.getRentalCarFailure(error));
  }
}
function* createRental({ payload }) {
  try {
    const data = yield call(createRentalRequest, payload);
    yield put(actions.createRentalCarSuccess(data));
  } catch (error) {
    yield put(actions.createRentalCarFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getRentalWatcher() {
  yield takeEvery(types.GET_RENTAL_CAR, getRental);
}
export function* createRentalWatcher() {
  yield takeEvery(types.CREATE_RENTAL_CAR, createRental);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getRentalWatcher), fork(createRentalWatcher)]);
}
