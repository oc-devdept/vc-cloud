import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_FOLLOWUP_RESULT,
  GET_FOLLOWUP_TYPE,
  NEW_FOLLOWUP,
  EDIT_FOLLOWUP,
  DELETE_FOLLOWUP,
  EDIT_FOLLOWUP_COMPLETE,
  ADD_FOLLOWUP_RESULT,
  EDIT_FOLLOWUP_RESULT,
  DELETE_FOLLOWUP_RESULT,
  ADD_FOLLOWUP_TYPE,
  EDIT_FOLLOWUP_TYPE,
  DELETE_FOLLOWUP_TYPE,
  GET_FILTER_TEMPLATE,
} from "./FollowupTypes";
import * as actions from "./FollowupActions";
import {
  addLeadFollowUp,
  editLeadFollowUp,
  deleteLeadFollowUp,
} from "Ducks/crm/lead";
import {
  addCustomerFollowUp,
  editCustomerFollowUp,
  deleteCustomerFollowUp,
} from "Ducks/crm/customer";
import {
  addDealFollowup,
  editDealFollowup,
  deleteDealFollowup,
} from "Ducks/crm/deal";

import api from "Api";

//=========================
// GET FOLLOWUP RESULT
//=========================
const getFollowupResultRequest = async () => {
  const result = await api.get("/followupresults");
  return result.data;
};
function* getFollowupResult() {
  try {
    const data = yield call(getFollowupResultRequest);
    yield put(actions.getFollowupResultSuccess(data));
  } catch (error) {
    yield put(actions.getFollowupResultFailure(error));
  }
}
export function* getFollowupResultWatcher() {
  yield takeEvery(GET_FOLLOWUP_RESULT, getFollowupResult);
}

//=========================
// ADD FOLLOWUP RESULT
//=========================
const postFollowupResultRequest = async (data) => {
  const result = await api.post("/followupresults", data);
  return result.data;
};
function* addFollowupResultDB({ payload }) {
  try {
    const data = yield call(postFollowupResultRequest, payload);
    const alldata = yield call(getFollowupResultRequest);
    yield put(actions.getFollowupResultSuccess(alldata));
  } catch (error) {
    yield put(actions.getFollowupResultFailure(error));
  }
}
export function* addFollowupResultWatcher() {
  yield takeEvery(ADD_FOLLOWUP_RESULT, addFollowupResultDB);
}

//=========================
// EDIT FOLLOWUP RESULT
//=========================
const editFollowupResultRequest = async (data) => {
  let { id, ...others } = data;
  const result = await api.patch(`/followupresults/${id}`, { ...others });
  return result.data;
};
function* editFollowupResultDB({ payload }) {
  try {
    const data = yield call(editFollowupResultRequest, payload);
    const alldata = yield call(getFollowupResultRequest);
    yield put(actions.getFollowupResultSuccess(alldata));
  } catch (error) {
    yield put(actions.editFollowupResultFailure(error));
  }
}
export function* editFollowupResultWatcher() {
  yield takeEvery(EDIT_FOLLOWUP_RESULT, editFollowupResultDB);
}

//=========================
// DELETE FOLLOWUP RESULT
//=========================
const deleteFollowupResultRequest = async (deleteId) => {
  const result = await api.delete(`/followupresults/${deleteId}`);
  return result.data;
};
function* deleteFollowupResultDB({ payload }) {
  try {
    yield call(deleteFollowupResultRequest, payload);
    const data = yield call(getFollowupResultRequest);
    yield put(actions.getFollowupResultSuccess(data));
  } catch (error) {
    yield put(actions.deleteFollowupResultFailure(error));
  }
}
export function* deleteFollowupResultWatcher() {
  yield takeEvery(DELETE_FOLLOWUP_RESULT, deleteFollowupResultDB);
}

//=========================
// GET FOLLOWUP TYPE
//=========================
const getFollowupTypeRequest = async () => {
  const result = await api.get("/followuptypes");
  return result.data;
};
function* getFollowupType() {
  try {
    const data = yield call(getFollowupTypeRequest);
    yield put(actions.getFollowupTypeSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.getFollowupTypeFailure(error));
  }
}
export function* getFollowupTypeWatcher() {
  yield takeEvery(GET_FOLLOWUP_TYPE, getFollowupType);
}

//=========================
// ADD FOLLOWUP TYPE
//=========================
const postFollowupTypeRequest = async (data) => {
  const result = await api.post("/followuptypes", data);
  return result.data;
};
function* addFollowupTypeDB({ payload }) {
  try {
    const data = yield call(postFollowupTypeRequest, payload);
    const alldata = yield call(getFollowupTypeRequest);
    yield put(actions.getFollowupTypeSuccess(alldata));
  } catch (error) {
    yield put(actions.getFollowupTypeFailure(error));
  }
}
export function* addFollowupTypeWatcher() {
  yield takeEvery(ADD_FOLLOWUP_TYPE, addFollowupTypeDB);
}

//=========================
// EDIT FOLLOWUP TYPE
//=========================
const editFollowupTypeRequest = async (data) => {
  let { id, ...others } = data;
  console.log(others);
  const result = await api.patch(`/followuptypes/${id}`, { ...others });
  return result.data;
};
function* editFollowupTypeDB({ payload }) {
  try {
    const data = yield call(editFollowupTypeRequest, payload);
    const alldata = yield call(getFollowupTypeRequest);
    yield put(actions.getFollowupTypeSuccess(alldata));
  } catch (error) {
    yield put(actions.editFollowupTypeFailure(error));
  }
}
export function* editFollowupTypeWatcher() {
  yield takeEvery(EDIT_FOLLOWUP_TYPE, editFollowupTypeDB);
}

//=========================
// DELETE FOLLOWUP TYPE
//=========================
const deleteFollowupTypeRequest = async (deleteId) => {
  const result = await api.delete(`/followuptypes/${deleteId}`);
  return result.data;
};
function* deleteFollowupTypeDB({ payload }) {
  try {
    yield call(deleteFollowupTypeRequest, payload);
    const data = yield call(getFollowupTypeRequest);
    yield put(actions.getFollowupTypeSuccess(data));
  } catch (error) {
    yield put(actions.deleteFollowupTypeFailure(error));
  }
}
export function* deleteFollowupTypeWatcher() {
  yield takeEvery(DELETE_FOLLOWUP_TYPE, deleteFollowupTypeDB);
}

//=========================
// NEW FOLLOWUP
//=========================
const newFollowupRequest = async (data) => {
  const result = await api.post("/followups/create", { data });
  console.log("FOLLOW UP REQUEST");
  console.log(data);
  console.log(result);
  return result.data.data;
};
function* newFollowup({ payload }) {
  try {
    const data = yield call(newFollowupRequest, payload);
    console.log("IN FOLLOW UP fucntion");
    console.log(data);
    if (data.followupableType == "Lead") {
      yield put(addLeadFollowUp(data));
    } else if (data.followupableType == "Customer") {
      yield put(addCustomerFollowUp(data));
    } else if (data.followupableType == "Deal") {
      yield put(addDealFollowup(data));
    }
  } catch (error) {
    yield put(actions.newFollowUpFailure(error));
  }
}
export function* postFollowupWatcher() {
  yield takeEvery(NEW_FOLLOWUP, newFollowup);
}

//=========================
// EDIT FOLLOWUP
//=========================
const editFollowupRequest = async (data) => {
  const result = await api.patch(`/followups/patch`, { data });
  return result.data.data;
};

function* editFollowup({ payload }) {
  try {
    delete payload.result;
    delete payload.type;
    const data = yield call(editFollowupRequest, payload);
    if (data.followupableType == "Lead") {
      yield put(editLeadFollowUp(data));
    } else if (data.followupableType == "Customer") {
      yield put(editCustomerFollowUp(data));
    } else if (data.followupableType == "Deal") {
      yield put(editDealFollowup(data));
    }
  } catch (error) {
    yield put(actions.editFollowUpFailure(error));
  }
}
export function* editFollowupWatcher() {
  yield takeEvery(EDIT_FOLLOWUP, editFollowup);
}

//=========================
// DELETE FOLLOWUP
//=========================
const deleteFollowupRequest = async (data) => {
  console.log("delete followup request");
  console.log(data);
  const result = await api.delete(`/followups/${data}`);
  console.log(result);
  return result.data;
};
function* deleteFollowup({ payload }) {
  try {
    yield call(deleteFollowupRequest, payload.id);
    if (payload.followupableType == "Lead") {
      yield put(deleteLeadFollowUp(payload.id));
    } else if (payload.followupableType == "Customer") {
      yield put(deleteCustomerFollowUp(payload.id));
    } else if (payload.followupableType == "Deal") {
      yield put(deleteDealFollowup(payload.id));
    }
  } catch (error) {
    yield put(actions.deleteFollowUpFailure(error));
  }
}
export function* deleteFollowupWatcher() {
  yield takeEvery(DELETE_FOLLOWUP, deleteFollowup);
}

//=========================
// EDIT COMPLETE FOLLOWUP
//=========================

const editFollowupCompleteRequest = async (data) => {
  console.log("EDIT FOLLOW UP REQUEST");
  console.log(data);
  const result = await api.patch(`/followups/completeFollowup`, { data });
  return result.data.data;
};

function* editFollowupComplete({ payload }) {
  try {
    console.log("hello");
    console.log(payload);
    const data = yield call(editFollowupCompleteRequest, payload);
    yield put(editFollowUpComplete(data));
  } catch (error) {
    yield put(actions.editFollowUpCompleteFailure(error));
  }
}
export function* editFollowupCompleteWatcher() {
  yield takeEvery(EDIT_FOLLOWUP_COMPLETE, editFollowupComplete);
}

//=========================
// FOLLOW UP FILTER
//=========================
const getFilterFollowupRequest = async ({
  limit,
  skip,
  filter,
  searchText,
  orderBy,
  custId,
}) => {
  // console.log("GET TEMPLATE FILTER REQUEST");
  const result = await api.post("followups/getall", {
    limit,
    skip,
    filter,
    searchText,
    orderBy,
    custId,
  });
  return result.data;
};
function* getFilterFollowup({ payload }) {
  try {
    // console.log("GET FILTER TEMPLATE");
    // console.log(payload);
    const data = yield call(getFilterFollowupRequest, payload);
    yield put(actions.getFilterFollowupSuccess(data));
  } catch (error) {
    yield put(actions.getFilterFollowupFailure(error));
  }
}
export function* getFilterFollowupWatcher() {
  yield takeEvery(ADD_FOLLOWUP_RESULT, getFilterFollowup);
}


//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getFollowupResultWatcher),
    fork(getFollowupTypeWatcher),
    fork(postFollowupWatcher),
    fork(editFollowupWatcher),
    fork(deleteFollowupWatcher),
    fork(editFollowupCompleteWatcher),
    fork(addFollowupResultWatcher),
    fork(editFollowupResultWatcher),
    fork(deleteFollowupResultWatcher),
    fork(addFollowupTypeWatcher),
    fork(editFollowupTypeWatcher),
    fork(deleteFollowupTypeWatcher),
    fork(getFilterFollowupWatcher),
  ]);
}
