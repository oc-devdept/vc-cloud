import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_RECENT_BOOKINGS } from "./BookingTypes";
import * as actions from "./BookingActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getRecentBookingRequest = async ({ type, id }) => {
  const result = await api.get(`/bookings/recentbooking/${type}/${id}`);
  return result.data.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getRecentBookings({ payload }) {
  try {
    const data = yield call(getRecentBookingRequest, payload);
    yield put(actions.getRecentBookingsSuccess(data));
  } catch (error) {
    yield put(actions.getRecentBookingsFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getRecentBookingWatcher() {
  yield takeEvery(GET_RECENT_BOOKINGS, getRecentBookings);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getRecentBookingWatcher)]);
}
