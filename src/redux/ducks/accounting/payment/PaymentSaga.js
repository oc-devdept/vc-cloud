import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import * as types from "./PaymentTypes";
import * as actions from "./PaymentActions";

import api from "Api";

//=========================
// REQUESTS
//=========================

const makePaymentRequest = async data => {  
  const result = await api.post("/accountpayments/payment", { data: data });
  return result.data;
};

// const fetchAllPaymentRequest = async data => {
//   const userId = localStorage.getItem('user_id');
//   const result = await api.post("/accountreconciles/getpaymentaccounts", {data: userId});
//   return result.data;
// };

const fetchAllPaymentRequest = async data => {
  const result = await api.get("/accountpayments/getAllPayments");
  return result.data;
};

const getSingleCompanyPaymentRequest = async data => {
  const result = await api.post("/accountreconciles/getSingleCompanyPayments", {
    data: data
  });
  return result.data;
};

const getAllCompanyPaymentRequest = async data => {
  const result = await api.post("/accountreconciles/getAllCompanyPayments");
  return result.data;
};

const getAllInvoicesCompanyPaymentRequest = async data => {
  const result = await api.post("/accountreconciles/getAllInvoicesOneCompany", {
    data: data
  });
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================

function* makePaymentFromDB({ payload }) {
  try {
    const data = yield call(makePaymentRequest, payload);
    yield delay(500);
    yield put(actions.makePaymentSuccess(data));
  } catch (error) {
    yield put(actions.makePaymentFailure(error));
  }
}

function* fetchAllPaymentFromDB({ payload }) {
  try {
    const data = yield call(fetchAllPaymentRequest, payload);
    yield delay(500);

    // if(data.success != 1) {
    //   var error = new Error('Unable to fetch payment list');
    //   throw error
    // }
 
    // return {getAllInvoicesPayment, checkingBalancePayment}
   
    yield put(actions.fetchAllPaymentSuccess(data.fields));
  } catch (error) {
    yield put(actions.fetchAllPaymentFailure(error));
  }
}

function* getSingleCompanyPaymentFromDB({ payload }) {
  try {
    const data = yield call(getSingleCompanyPaymentRequest, payload);
    yield delay(500);

    if (data.success != 1) {
      var error = new Error("Unable to fetch payment list");
      throw error;
    }
    yield put(actions.getSingleCompanyPaymentSuccess(data));
  } catch (error) {
    yield put(actions.getSingleCompanyPaymentFailure(error));
  }
}

function* getAllCompanyPaymentFromDB({ payload }) {
  try {
    const data = yield call(getAllCompanyPaymentRequest, payload);

    yield delay(500);
    yield put(actions.fetchAllCompaniesSuccess(data.fields));
  } catch (error) {
    yield put(actions.fetchAllCompaniesFailure(error));
  }
}

function* getAllInvoicesCompanyPaymentFromDB({ payload }) {
  try {
    const data = yield call(getAllInvoicesCompanyPaymentRequest, payload);
    yield delay(500);

    yield put(actions.fetchAllInovicesOneCompanySuccess(data.fields));
  } catch (error) {
    yield put(actions.fetchAllInovicesOneCompanyFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* makePaymentWatcher() {
  yield takeEvery(types.MAKE_PAYMENT, makePaymentFromDB);
}

export function* fetchPaymentWatcher() {
  yield takeEvery(types.FETCH_ALL_PAYMENT, fetchAllPaymentFromDB);
}

export function* getSingleCompanyPaymentWatcher() {
  yield takeEvery(
    types.GET_SINGLE_COMPANY_PAYMENT,
    getSingleCompanyPaymentFromDB
  );
}

export function* getAllCompanyPaymentWatcher() {
  yield takeEvery(types.FETCH_ALL_COMPANINES, getAllCompanyPaymentFromDB);
}

export function* getAllInvoicesCompanyPaymentWatcher() {
  yield takeEvery(
    types.FETCH_ALL_INVOICES_COMPANINES,
    getAllInvoicesCompanyPaymentFromDB
  );
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(makePaymentWatcher),
    fork(fetchPaymentWatcher),

    fork(getSingleCompanyPaymentWatcher),
    fork(getAllCompanyPaymentWatcher),

    fork(getAllInvoicesCompanyPaymentWatcher)
  ]);
}

// export const  = "FETCH_ALL_INVOICES_COMPANINES";
// export const FETCH_ALL_INVOICES_COMPANINES_SUCCESS = "FETCH_ALL_INVOICES_COMPANINES_SUCCESS";
// export const FETCH_ALL_INVOICES_COMPANINES_FAILURE = "FETCH_ALL_INVOICES_COMPANINES_FAILURE";
