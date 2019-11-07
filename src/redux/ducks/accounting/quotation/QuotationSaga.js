import {
  all,
  call,
  fork,
  put,
  takeEvery,
  select,
  delay
} from "redux-saga/effects";

import * as Types from "./QuotationTypes";
import * as Actions from "./QuotationActions";

import api from "Api";

//=========================
// REQUESTS
//=========================

const getAllQuoteRequest = async () => {
  // const id = localStorage.getItem('user_id');
  // const result = await api.get(`/quotations?filter[where][userId]=${id}&`);
  // return result.data;

  const result = await api.get(`/quotations/getAllQuotations`);
  return result.data;
};

// const submitquoteSummaryRequest = async(item) => {

//   var today = new Date();
//   var duedate = new Date();
//   duedate.setDate(today.getDate()+3);

//   // payload: {item: item, products: products}
//   let quotationLine = [...item.payload.products]
//   let postData = {...item.payload.item}

//   let quotationData = {
//     date : postData.date.toString(),
//     sent_date : postData.date.toString(),
//     attn_toId : {id: postData.attn_toId.id, name: postData.attn_toId.name},
//     accountId : {id: postData.accountId.id, name: postData.accountId.name},
//     owner: {companyId: postData.owner.companyId, id: postData.owner.id, name: postData.owner.name},
//     currency : postData.currency,
//     currency_rate : postData.currency_rate,
//     due_date : duedate.toDateString(),

//     totalAmt : postData.totalAmt,
//     subtotal : postData.subtotal,
//     tax_amount : postData.tax_amount,

//     discount_rate: postData.discount_rate,

//     description: postData.description,
//     details: postData.details,

//     quotationline: quotationLine,

//     userId : postData.owner.id

//   }

//   let result = null
//   if(item.payload.type == "invoice"){
//     result = await api.post("/invoices", {data: quotationData});
//   } else {
//     result = await api.post("/quotations", {data: quotationData});
//   }
//   return result.data;
// }

const submitEditQuoteSummaryRequest = async ({ payload }) => {
  const result = await api.patch(`/quotations/${payload.id}`, payload);
  return result.data;
};

const deleteQuotationfromDBRequest = async item => {
  const result = await api.delete(`/quotations/${item.payload}`);
  return result.data;
};

const addNoteQuotationRequest = async (id, note) => {
  const result = await api.post(`/quotations/${id}/notes`, note);
  return result.data;
};

const patchStateQuotationRequest = async payload => {
  const result = await api.post(`/quotations/updateStatus/`, { data: payload });
  return result.data;
};

const createNewVersionStateQuotationRequest = async payload => {
  const result = await api.post(`/quotations/newVersion`, { data: payload });
  return result.data;
};

const revertPreviousVersionStateQuotationRequest = async payload => {
  const result = await api.post(`/quotations/revertQuotation`, {
    data: payload
  });
  return result.data;
};

const convertInvoiceQuotationRequest = async payload => {
  const result = await api.post(`/quotations/convertInvoice`, {
    data: payload
  });
  return result.data;
};

const getQuoteRequest = async quoteID => {
  const result = await api.get(`/quotations/${quoteID.quoteID}`);
  return result.data;
};

const handleQuotationAccountsRequest = async () => {
  const result = await api.get(`/quotations/formFields`);
  return result.data;
};

const submitNewQuotationRequest = async payload => {

  const result = await api.post("/quotations/submitQuotations", {data: payload})

  return result.data;
};


function* getAllQuoteFromDB() {
  try {
    const data = yield call(getAllQuoteRequest);
    yield delay(500);
    yield put(Actions.getQuotationSuccess(data.fields));
  } catch (error) {
    yield put(Actions.getQuotationFailure(error));
  }
}

function* getQuoteFromDB({ payload }) {
  try {
    const data = yield call(getQuoteRequest, payload);
    yield delay(500);

    yield put(Actions.getSingleQuotationSuccess(data));
  } catch (error) {
    yield put(Actions.getQuotationFailure(error));
  }
}

function* submitQuoteSummarytoDB(payload) {
  try {
    const data = yield call(submitEditQuoteSummaryRequest, payload);
    yield put(Actions.submitNewQuoteSuccess(data));
  } catch (error) {
    yield put(Actions.submitNewQuoteFailure(error));
  }
}

function* deleteQuotationfromDB(item) {
  try {
    const data = yield call(deleteQuotationfromDBRequest, item);
    if (data.count == 0) {
      var error = new Error();
      throw error;
    }
    yield put(Actions.deleteSingleQuoteSuccess(data));
  } catch (error) {
    yield put(Actions.deleteSingleQuoteFailure("Unable to delete the record"));
  }
}

function* addQuotationNoteToDB({ payload }) {
  const { id, note } = payload;
  try {
    const data = yield call(addNoteQuotationRequest, id, note);
    yield put(Actions.addNoteQuotationSuccess(data));
  } catch (error) {
    yield put(Actions.addNoteQuotationFailure(error));
  }
}

function* patchStateQuotation({ payload }) {
  try {
    const data = yield call(patchStateQuotationRequest, payload);
    yield put(Actions.HandleStateUpdateSuccess(data.data));
  } catch (error) {
    yield put(Actions.HandleStateUpdateFailure(error));
  }
}

function* createNewVersionStateQuotation({ payload }) {
  try {
    const data = yield call(createNewVersionStateQuotationRequest, payload);
    yield put(Actions.HandleStateUpdateSuccess(data.data));
  } catch (error) {
    yield put(Actions.HandleStateUpdateFailure(error));
  }
}

function* revertPreviousVersionStateQuotation({ payload }) {
  try {
    const data = yield call(
      revertPreviousVersionStateQuotationRequest,
      payload
    );
    yield put(Actions.HandleStateUpdateSuccess(data.data));
  } catch (error) {
    yield put(Actions.HandleStateUpdateFailure(error));
  }
}

function* convertInvoiceQuotation({ payload }) {
  try {
    const data = yield call(convertInvoiceQuotationRequest, payload);
    yield put(Actions.HandleStateUpdateSuccess(data.data));
  } catch (error) {
    yield put(
      Actions.HandleStateUpdateFailure(
        "Unable to convert the quotation to invoice"
      )
    );
  }
}

function* handleQuotationAccounts({ payload }) {
  try {
    const data = yield call(handleQuotationAccountsRequest, payload);
    yield put(Actions.HandleQuotationAccountsSuccess(data));
  } catch (error) {
    yield put(
      Actions.HandleQuotationAccountsFailure(
        "Unable to retrieve account records"
      )
    );
  }
}

function* submitNewQuotation({ payload }) {
  try {
    const data = yield call(submitNewQuotationRequest, payload);
    yield put(Actions.submitNewQuotationSuccess(data));
  } catch (error) {
    yield put(
      Actions.submitNewQuotationFailure("Unable to create new quotation")
    );
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
// export function* changeViewWatcher() {
//   yield takeEvery(Types.CHANGE_QUOTATION_LIST_VIEW, changeQuoteList);
// }
// export function* getQuoteSummaryWatcher() {
//   yield takeEvery(Types.GET_QUOTE_SUMMARY, getQuoteSummaryFromDB);
// }
export function* getAllQuoteWatcher() {
  yield takeEvery(Types.GET_ALL_QUOTATION, getAllQuoteFromDB);
}
export function* getSingleQuotationWatcher() {
  yield takeEvery(Types.GET_SINGLE_QUOTATION, getQuoteFromDB);
}
export function* submitQuoteSummaryWatcher() {
  yield takeEvery(Types.SUBMIT_QUOTATION, submitQuoteSummarytoDB);
}
export function* deleteQuoteSummaryWatcher() {
  yield takeEvery(Types.DELETE_QUOTATION, deleteQuotationfromDB);
}
export function* addNoteQuotationWatcher() {
  yield takeEvery(Types.ADD_NOTE_QUOTATION, addQuotationNoteToDB);
}
export function* patchStateQuotationWatcher() {
  yield takeEvery(Types.HANDLE_STATE_UPDATE, patchStateQuotation);
}
export function* createNewVersionQuotationWatcher() {
  yield takeEvery(
    Types.HANDLE_STATE_CREATE_NEW_VERSION,
    createNewVersionStateQuotation
  );
}
export function* revertPreviousVersionQuotationWatcher() {
  yield takeEvery(
    Types.HANDLE_STATE_REVERT_PREVIOUS_VERSION,
    revertPreviousVersionStateQuotation
  );
}
export function* convertInvoiceQuotationWatcher() {
  yield takeEvery(
    Types.HANDLE_STATE_CONVERT_INVOICE_QUOTATION,
    convertInvoiceQuotation
  );
}
export function* handleAccountsWatcher() {
  yield takeEvery(Types.HANDLE_QUOTATION_ACCOUNTS, handleQuotationAccounts);
}
export function* submitNewQuotationWatcher() {
  yield takeEvery(Types.SUBMIT_NEW_QUOTATION, submitNewQuotation);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    // fork(changeViewWatcher),
    // fork(getQuoteSummaryWatcher),
    fork(getAllQuoteWatcher),
    fork(getSingleQuotationWatcher),
    fork(submitQuoteSummaryWatcher),
    fork(deleteQuoteSummaryWatcher),
    fork(addNoteQuotationWatcher),
    fork(patchStateQuotationWatcher),
    fork(createNewVersionQuotationWatcher),
    fork(revertPreviousVersionQuotationWatcher),
    fork(convertInvoiceQuotationWatcher),
    fork(handleAccountsWatcher),
    fork(submitNewQuotationWatcher)
  ]);
}
