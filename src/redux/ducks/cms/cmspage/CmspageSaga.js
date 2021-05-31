import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  NEW_CMSPAGE,
  GET_ALL_CMSPAGES,
  GET_SINGLE_CMSPAGE,
  UPDATE_CMSPAGE,
  DELETE_CMSPAGE,
  GET_ALL_MENUPAGES,
  GET_CMS_MENU,
  SAVE_CMS_MENU
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
  deleteCmspageFailure,
  getAllMenuPagesSuccess,
  getMenuSuccess,
  saveCmsMenuSuccess,
  saveCmsMenuFailure,
  getMenuFailure
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
  let result = await api.delete(`cmspages/${id}`);
}
const getAvailableCmsPagesRequest = async () => {
  let result = await api.get(`cmsmenus/getAvailable`);
  return result.data;
}
const getAllCmsMenuRequest = async () => {
  let result = await api.get('cmsmenus/getHtml');
  return result.data;
}

const postCmsMenu = async(data) => {
  let result = await api.post('cmsmenus/saveMenus', { data });
  return result.data;
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

function* getAvailablePagesFromDB(){
  try {
    const data = yield call(getAvailableCmsPagesRequest);
    yield put(getAllMenuPagesSuccess(data));
  }
  catch(error){
    yield put(getAllCmspagesFailure(error));
  }
}

function* getAllMenuFromDB(){
  try {
    const data = yield call(getAllCmsMenuRequest);
    yield put(getMenuSuccess(data));
  }
  catch(error){
    yield put(getMenuFailure(error));
  }
}

function* saveAllMenuDB({ payload }) {
  try {
    const data = yield call(postCmsMenu, payload);
    yield put(saveCmsMenuSuccess(data));    
  }
  catch(error){
    yield put(saveCmsMenuFailure(error));
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
export function* getAllAvailablePagesWatcher(){
  yield takeEvery(GET_ALL_MENUPAGES, getAvailablePagesFromDB);
}
export function* getAllMenuWatcher(){
  yield takeEvery(GET_CMS_MENU, getAllMenuFromDB);
}
export function* saveAllMenuWatcher(){
  yield takeEvery(SAVE_CMS_MENU, saveAllMenuDB);
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
      fork(getAllAvailablePagesWatcher),
      fork(getAllMenuWatcher),
      fork(saveAllMenuWatcher)
  ]);
}
