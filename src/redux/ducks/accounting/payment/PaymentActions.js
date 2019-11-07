import * as types from "./PaymentTypes";

// /**
//  * Change List View
//  */
export const changePaymentView = newValue => ({
  type: types.CHANGE_PAYMENT_LIST_VIEW,
  payload: newValue
});
// /**
//  * Toggle DropDown
//  */
export const togglePaymentDropDown = () => ({
  type: types.PAYMENT_LIST_DROPDOWN
});

export const getAllPayment = () => ({
  type: types.GET_ALL_PAYMENT
});



/**
 * Make Payment
 */
export const makePayment = data => ({
  type: types.MAKE_PAYMENT,
  payload: data
});
export const makePaymentSuccess = data => ({
  type: types.MAKE_PAYMENT_SUCCESS,
  payload: data
});
export const makePaymentFailure = () => ({
  type: types.MAKE_PAYMENT_FAILURE
});

export const makePaymentIncompleteFields = (field) => ({
  type: types.MAKE_PAYMENT_INCOMPLETE_FAILURE,
  payload: field
});


export const fetchAllPayment = data => ({
  type: types.FETCH_ALL_PAYMENT,
  payload: data
});

export const fetchAllPaymentSuccess = data => ({
  type: types.FETCH_ALL_PAYMENT_SUCCESS,
  payload: data
});

export const fetchAllPaymentFailure = data => ({
  type: types.FETCH_ALL_PAYMENT_FAILURE,
  payload: data
});


export const getSingleCompanyPayment = data => ({
  type: types.GET_SINGLE_COMPANY_PAYMENT,
  payload: data
});

export const getSingleCompanyPaymentSuccess = data => ({
  type: types.GET_SINGLE_COMPANY_PAYMENT_SUCCESS,
  payload: data
});

export const getSingleCompanyPaymentFailure = data => ({
  type: types.GET_SINGLE_COMPANY_PAYMENT_FAILURE,
  payload: data
});



export const fetchAllCompanies = data => ({
  type: types.FETCH_ALL_COMPANINES,
  payload: data
});

export const fetchAllCompaniesSuccess = data => ({
  type: types.FETCH_ALL_COMPANINES_SUCCESS,
  payload: data
});

export const fetchAllCompaniesFailure = data => ({
  type: types.FETCH_ALL_COMPANINES_FAILURE,
  payload: data
});




export const fetchAllInovicesOneCompany = data => ({
  type: types.FETCH_ALL_INVOICES_COMPANINES,
  payload: data
});

export const fetchAllInovicesOneCompanySuccess = data => ({
  type: types.FETCH_ALL_INVOICES_COMPANINES_SUCCESS,
  payload: data
});

export const fetchAllInovicesOneCompanyFailure = data => ({
  type: types.FETCH_ALL_INVOICES_COMPANINES_FAILURE,
  payload: data
});

