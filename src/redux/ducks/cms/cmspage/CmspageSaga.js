import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  NEW_CMSPAGE,
  GET_ALL_CMSPAGES,
  GET_SINGLE_CMSPAGE,
  UPDATE_CMSPAGE,
  DELETE_CMSPAGE
} from "./CmspageTypes";

import {
  getAllCmspagesSuccess,
  getAllCmspagesFailure,
  updateCmspageSuccess,
  updateCmspageFailure,
  getSingleCmspageSuccess,
  getSingleCmspageFailure,
  newCmspageSuccess,
  newCmspageFailure,
  deleteCmspageSuccess,
  deleteCmspageFailure
} from "./CmspageActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllCmsPageRequest = async () => {
  const result = await api.get("/cmspages/getall");
  return result.data.data;
};
const getSinglePageRequest = async (id) => {
  let result = await api.get(`/cmspages/${id}`);
  return result.data;
};
const postNewCmspage = async (data) => {
  const result = await api.post('/cmspages/customCreate', { data });
  return result.data.data;
};
const updateCmspageRequest = async ({id, ...others}) => {
  const result = await api.patch(`/cmspages/${id}`, others);
  return result.data;
}
const deleteCmspageRequest = async (id) => {
  console.log(id);
  let result = await api.delete(`cmspages/${id}`);
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllCmspagesFromDB() {
  try {
    const data = yield call(getAllCmsPageRequest);
    yield put(getAllCmspagesSuccess(data));
  } catch (error) {
    yield put(getAllCmspagesFailure(error));
  }
}
function* newCmsPageToDB({ payload }) {
  try {
    const data = yield call(postNewCmspage, payload);
    yield put(newCmspageSuccess(data));
  } catch (error) {
    yield put(newCmspageFailure(error));
  }
}
function* getSinglePageFromDB({ payload }) {
  try {
    const data = yield call(getSinglePageRequest, payload);
    yield put(getSingleCmspageSuccess(data));
  } catch (error) {
    yield put(getSingleCmspageFailure(error));
  }
}
function* updateSinglePageFromDB({ payload }){
  try {
    const data = yield call(updateCmspageRequest, payload);
    yield put(updateCmspageSuccess(data));    
  }
  catch(error){
    yield put(updateCmspageFailure(error));
  }
}
function* deleteCmspageDB({payload}){
  try {
    yield call(deleteCmspageRequest, payload);
    yield put(deleteCmspageSuccess(payload));
  }
  catch(error){
    yield put(deleteCmspageFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllCmspageWatcher() {
  yield takeEvery(GET_ALL_CMSPAGES, getAllCmspagesFromDB);
}
export function* newCmspageWatcher() {
  yield takeEvery(NEW_CMSPAGE, newCmsPageToDB);
}
export function* getSingleCmspageWatcher() {
  yield takeEvery(GET_SINGLE_CMSPAGE, getSinglePageFromDB);
}
export function* updatePageWatcher(){
  yield takeEvery(UPDATE_CMSPAGE, updateSinglePageFromDB);
}
export function* deletePageWatcher(){
  yield takeEvery(DELETE_CMSPAGE, deleteCmspageDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
      fork(getAllCmspageWatcher),
      fork(newCmspageWatcher),
      fork(getSingleCmspageWatcher),
      fork(updatePageWatcher),
      fork(deletePageWatcher),
      
  ]);
}
