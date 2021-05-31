import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_MAILING_LIST,
  GET_ALL_ADMIN_MAILING_LIST,
  GET_SINGLE_MAILING,
  GET_MAILING_LIST,
  GET_CONTACTS,
  SAVE_TO_MAILING_LIST,
  REMOVE_FROM_MAILING_LIST,
  CREATE_MAILING_LIST,
  UPDATE_MAILING_LIST,
  DELETE_MAILING_LIST,
  GET_CAMPAIGN_MAILING_LIST,
  GET_ALL_RELATED_CAMPAIGNS,
} from "./MailTypes";

import {
  getAllMailingListSuccess,
  getAllMailingListFailure,
  getSingleMailingSuccess,
  getSingleMailingFailure,
  getMailingListSuccess,
  getMailingListFailure,
  getContactsSuccess,
  getContactsFailure,
  saveToMailingListSuccess,
  saveToMailingListFailure,
  removeFromMailingListSuccess,
  removeFromMailingListFailure,
  createMailingListSuccess,
  createMailingListFailure,
  getAllAdminMailingListSuccess,
  getAllAdminMailingListFailure,
  updateMailingListSuccess,
  updateMailingListFailure,
  deleteMailingListSuccess,
  deleteMailingListFailure,
  getCampaignMailingListSuccess,
  getCampaignMailingListFailure,
  getAllRelatedCampaignsSuccess,
  getAllRelatedCampaignsFailure,
} from "./MailActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllMailingListRequest = async () => {
  const result = await api.get("/MailingLists/getAllList");
  return result.data.list;
};
const getSingleMailingRequest = async (id) => {
  const result = await api.get(`MailingLists/${id}`);
  return result.data;
}

const getMailingListRequest = async ({ listId, limit,  skip, filter, searchText, orderBy }) => {
  const result = await api.post(`/MailingLists/getemails`, { limit, listId, skip, filter, searchText, orderBy });
  return result.data;
};

const getContactsRequest = async ({ listId, limit,  skip, filter, searchText, orderBy }) => {
  // console.log("getting contacts");
  const custContact = await api.post("/MailingLists/getcustomers", { limit, listId, skip, filter, searchText, orderBy });

  return custContact.data;
};

const saveToMailingListRequest = async (contacts, listId) => {
  const result = await api.post(`/MailingLists/${listId}/addContact`, contacts);
  return result.data;
};
const removeFromMailingListRequest = async (contacts, listId) => {
  const result = await api.post(`/MailingLists/${listId}/removeContact`,contacts);
  return result.data;
};
const createMailingListRequest = async data => {
  const result = await api.post("/MailingLists", data);
  return result.data;
};
const getAllAdminListRequest = async () => {
  const result = await api.get("/MailingLists/getAllAdminList");
  return result.data.list;
};
const updateMailingListRequest = async data => {
  const result = await api.patch(`/MailingLists/${data.id}`, data);
  return result.data;
};
const deleteMailingListRequest = async id => {
  const result = await api.delete(`/MailingLists/${id}`);
  return result.data;
};
const getCampaignMailingListRequest = async (userId, mailListId) => {
  const result = await api.post("/MailingLists/getMailListUsedCampaign", { userId, mailListId });
  // console.log(result.data);
  return result.data;
};

const getAllRelatedCampaignsRequest = async (userId, mailListId) => {
  const result = await api.post("/MailingLists/getAllRelatedCampaigns", { userId, mailListId });
  console.log(result.data);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllMailingList() {
  try {
    const data = yield call(getAllMailingListRequest);
    yield put(getAllMailingListSuccess(data));
  } catch (error) {
    yield put(getAllMailingListFailure(error));
  }
}
function* getSingleMailingFromDB({ payload}) {
  try {
    const data = yield call(getSingleMailingRequest, payload);
    yield put(getSingleMailingSuccess(data));
  } catch(error){
    yield put(getSingleMailingFailure(error));
  }
}
function* getMailingList({ payload }) {
  try {
    const data = yield call(getMailingListRequest, payload);
    yield put(getMailingListSuccess(data));
  } catch (error) {
    yield put(getMailingListFailure(error));
  }
}
function* getContacts({ payload }) {
  try {
    const data = yield call(getContactsRequest, payload);
    yield put(getContactsSuccess(data));
  } catch (error) {
    yield put(getContactsFailure(error));
  }
}
function* saveToMailingList({ payload }) {
  try {
    const getListId = state =>
      state.marketingState.mailState.allMailingList.nowShowing.id;
    const listId = yield select(getListId);
    const data = yield call(saveToMailingListRequest, payload, listId);
    yield put(saveToMailingListSuccess(data));
  } catch (error) {
    yield put(saveToMailingListFailure(error));
  }
}
function* removeFromMailingList({ payload }) {
  try {
    const getListId = state =>
      state.marketingState.mailState.allMailingList.nowShowing.id;
    const listId = yield select(getListId);
    const data = yield call(removeFromMailingListRequest, payload, listId);
    yield put(removeFromMailingListSuccess(data));
  } catch (error) {
    yield put(removeFromMailingListFailure(error));
  }
}
function* createMailingList({ payload }) {
  try {
    const data = yield call(createMailingListRequest, payload);
    yield put(createMailingListSuccess(data));
  } catch (error) {
    yield put(createMailingListFailure(error));
  }
}
function* getAllAdminList() {
  try {
    const data = yield call(getAllAdminListRequest);
    yield put(getAllAdminMailingListSuccess(data));
  } catch (error) {
    yield put(getAllAdminMailingListFailure(error));
  }
}
function* updateMailingList({ payload }) {
  try {
    const data = yield call(updateMailingListRequest, payload);
    yield put(updateMailingListSuccess(data));
  } catch (error) {
    yield put(updateMailingListFailure(error));
  }
}
function* deleteMailingList({ payload }) {
  try {
    yield call(deleteMailingListRequest, payload);
    yield put(deleteMailingListSuccess(payload));
  } catch (error) {
    yield put(deleteMailingListFailure(error));
  }
}
function* getCampaignMailingList({ payload }) {
  try {
    const data = yield call(getCampaignMailingListRequest, payload.userId, payload.mailListId);
    yield put(getCampaignMailingListSuccess(data));
  } catch (error) {
    yield put(getCampaignMailingListFailure(error));
  }
}
function* getAllRelatedCampaigns({ payload }) {
  try {
    const data = yield call(getAllRelatedCampaignsRequest, payload.userId, payload.mailListId);
    yield put(getAllRelatedCampaignsSuccess(data));
  } catch (error) {
    yield put(getAllRelatedCampaignsFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllMailingListWatcher() {
  yield takeEvery(GET_ALL_MAILING_LIST, getAllMailingList);
}
export function* getSingleMailingListWatcher() {
  yield takeEvery(GET_SINGLE_MAILING, getSingleMailingFromDB);
}
export function* getMailingListWatcher() {
  yield takeEvery(GET_MAILING_LIST, getMailingList);
}
export function* getContactsWatcher() {
  yield takeEvery(GET_CONTACTS, getContacts);
}
export function* saveToMailingListWatcher() {
  yield takeEvery(SAVE_TO_MAILING_LIST, saveToMailingList);
}
export function* removeFromMailingListWatcher() {
  yield takeEvery(REMOVE_FROM_MAILING_LIST, removeFromMailingList);
}
export function* createMailingListWatcher() {
  yield takeEvery(CREATE_MAILING_LIST, createMailingList);
}
export function* getAllAdminMailingListWatcher() {
  yield takeEvery(GET_ALL_ADMIN_MAILING_LIST, getAllAdminList);
}
export function* updateMailingListWatcher() {
  yield takeEvery(UPDATE_MAILING_LIST, updateMailingList);
}
export function* deleteMailingListWatcher() {
  yield takeEvery(DELETE_MAILING_LIST, deleteMailingList);
}
export function* getCampaignMailingListWatcher() {
  yield takeEvery(GET_CAMPAIGN_MAILING_LIST, getCampaignMailingList);
}
export function* getAllRelatedCampaignsWatcher() {
  yield takeEvery(GET_ALL_RELATED_CAMPAIGNS, getAllRelatedCampaigns);
}


//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllMailingListWatcher),
    fork(getSingleMailingListWatcher),
    fork(getMailingListWatcher),
    fork(getContactsWatcher),
    fork(saveToMailingListWatcher),
    fork(removeFromMailingListWatcher),
    fork(createMailingListWatcher),
    fork(getAllAdminMailingListWatcher),
    fork(updateMailingListWatcher),
    fork(deleteMailingListWatcher),
    fork(getCampaignMailingListWatcher),
    fork(getAllRelatedCampaignsWatcher),
  ]);
}
