import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_TEMPLATE,
  ADD_TEMPLATE,
  UPDATE_TEMPLATE
} from "./TemplateTypes";

import {
  getAllTemplateSuccess,
  getAllTemplateFailure,
  addTemplateSuccess,
  addTemplateFailure,
  updateTemplateSuccess,
  updateTemplateFailure
} from "./TemplateActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllTemplateRequest = async () => {
  const result = await api.get("/MailingTemplates/getAll");
  return result.data;
};
const addCampaignTemplateRequest = async data => {
  const result = await api.post("/MailingTemplates/customTemplateCreate", data);
  return result.data.data;
};

const updateCampaignTemplateRequest = async data => {
  const result = await api.patch(`/MailingTemplates/${data.id}`, data);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllTemplate() {
  try {
    const data = yield call(getAllTemplateRequest);
    yield put(getAllTemplateSuccess(data));
  } catch (error) {
    yield put(getAllTemplateFailure(error));
  }
}
function* addCampaignTemplate({ payload }) {
  try {
    const data = yield call(addCampaignTemplateRequest, payload);
    yield put(addTemplateSuccess(data));
  } catch (error) {
    yield put(addTemplateFailure(error));
  }
}

function* updateCampaignTemplate({ payload }) {
  try {
    const data = yield call(updateCampaignTemplateRequest, payload);
    yield put(updateTemplateSuccess(data));
  } catch (error) {
    yield put(updateTemplateFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllTemplateWatcher() {
  yield takeEvery(GET_ALL_TEMPLATE, getAllTemplate);
}
export function* addTemplateWatcher() {
  yield takeEvery(ADD_TEMPLATE, addCampaignTemplate);
}
export function* updateTemplateWatcher() {
  yield takeEvery(UPDATE_TEMPLATE, updateCampaignTemplate);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllTemplateWatcher),
    fork(addTemplateWatcher),
    fork(updateTemplateWatcher)
  ]);
}
