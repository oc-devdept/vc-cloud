import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {GET_ALL_CAR, GET_CATEGORY, GET_PRODUCTS} from "./CarTypes";
import {
  getAllCarFailure,
  getAllCarSuccess,
  getCategory,
  getCategoryFailure,
  getCategorySuccess,
  getProducts, getProductsFailure,
  getProductsSuccess,
} from "./CarActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllCarFromDBRequest = async () => {
  const result = await api.get("/carpages/getAllCarData");
  return result.data.data;
};
const getCategoryFromDBRequest = async () => {
  const result = await api.get("/categories/getModelCategory");
  return result.data.fields;
};
const getProductsFromDBRequest = async () => {
  const result = await api.get("/productDetails");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllCarFromDB() {
  try {
    const data = yield call(getAllCarFromDBRequest);
    yield put(getAllCarSuccess(data));
  } catch (error) {
    yield put(getAllCarFailure(error));
  }
}
function* getCategoryFromDB() {
  try {
    const data = yield call(getCategoryFromDBRequest);
    yield put(getCategorySuccess(data));
  } catch (error) {
    yield put(getCategoryFailure(error));
  }
}
function* getProductsFromDB() {
  try {
    const data = yield call(getProductsFromDBRequest);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllCarWatcher() {
  yield takeEvery(GET_ALL_CAR, getAllCarFromDB);
}
export function* getCategoryWatcher() {
  yield takeEvery(GET_CATEGORY, getCategoryFromDB);
}
export function* getProductsWatcher() {
  yield takeEvery(GET_PRODUCTS, getProductsFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
      fork(getAllCarWatcher),
      fork(getCategoryWatcher),
      fork(getProductsWatcher)
  ]);
}
