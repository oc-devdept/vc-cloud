import * as types from './InvoiceTypes'

/**
 * Change List View
 */
export const changeInvoiceView = newValue => ({
  type: types.CHANGE_INVOICE_LIST_VIEW,
  payload: newValue
});
/**
 * Toggle DropDown
 */
export const toggleInvoiceDropDown = () => ({
  type: types.INVOICE_LIST_DROPDOWN
});
/**
 * Toggle Summary List
 */
export const toggleInvoiceSummary = () => ({
  type: types.TOGGLE_INVOICE_SUMMARY
});

/**
 * Get Invoice Failure
 */
export const getInvoiceFailure = error => ({
  type: types.GET_INVOICE_FAILURE,
  payload: error
});

/**
 * Get Invoice Success
 */
export const getInvoiceSuccess = data => ({
  type: types.GET_INVOICE_SUCCESS,
  payload: data
});

/**
 * Get All Invoice
 */
export const getAllInvoice = () => ({
  type: types.GET_ALL_INVOICE
});

/**
 * Get My Invoice
 */
export const getMyInvoice = () => ({
  type: types.GET_MY_INVOICE
});

/**
 * Get Open Invoice
 */
export const getOpenInvoice = () => ({
  type: types.GET_OPEN_INVOICE
});

/**
 * Get Closed Invoice
 */
export const getClosedInvoice = () => ({
  type: types.GET_CLOSED_INVOICE
});

/**
 * Get Single Invoice
 */
export const getSingleInvoice = invID => ({
  type: types.GET_SINGLE_INVOICE,
  payload: invID
});
export const getSingleInvoiceSuccess = data => ({
  type: types.GET_SINGLE_INVOICE_SUCCESS,
  payload: data
});
export const clearSingleInvoice = () => ({
  type: types.CLEAR_SINGLE_INVOICE
});

/**
 * Get Invoice Summary
 */
export const getInvoiceSummary = () => ({
  type: types.GET_INVOICE_SUMMARY
});
export const getInvoiceSummarySuccess = data => ({
  type: types.GET_INVOICE_SUMMARY_SUCCESS,
  payload: data
});
export const getInvoiceSummaryFailure = error => ({
  type: types.GET_INVOICE_SUMMARY_FAILURE,
  payload: error
});


/**
 * Delete Quotation in DB
 */
export const deleteSingleInvoice = (item) => ({
  type: types.DELETE_INVOICE,
  payload: item
});

export const deleteSingleInvoiceSuccess = (item) => ({
  type: types.DELETE_INVOICE_SUCCESS,
  payload: item
});

export const deleteSingleInvoiceFailure = (item) => ({
  type: types.DELETE_INVOICE_FAILURE,
  payload: item
});


export const InvoiceHandleStateUpdate = (id, value) => ({
  type: types.INVOICE_HANDLE_STATE_UPDATE,
  payload: { id, value }
});

export const InvoiceHandleStateUpdateSuccess = (data) => ({
  type: types.INVOICE_HANDLE_STATE_UPDATE_SUCCESS,
  payload: data
});

export const InvoiceHandleStateUpdateFailure = (field, value) => ({
  type: types.INVOICE_HANDLE_STATE_UPDATE_FAILURE,
  payload: { field, value }
});

export const InvoiceHandleStateCreateNewVersion = (id, value) => ({
  type: types.INVOICE_HANDLE_STATE_CREATE_NEW_VERSION,
  payload: { id, value }
});



export const submitInvoice = (item) => ({
  type: types.SUBMIT_INVOICE,
  payload: item
});

export const submitInvoiceSuccess = (item) => ({
  type: types.SUBMIT_INVOICE_SUCCESS,
  payload: item,
});

export const submitInvoiceFailure = (item) => ({
  type: types.SUBMIT_INVOICE_FAILURE,
  payload: item
});


export const submitNewInvoice = (item) => ({
  type: types.SUBMIT_NEW_INVOICE,
  payload: item
  // payload: item
});

export const submitNewInvoiceSuccess = (item) => ({
  type: types.SUBMIT_NEW_INVOICE_SUCCESS,
  payload: item,
});

export const submitNewInvoiceFailure = (item) => ({
  type: types.SUBMIT_NEW_INVOICE_FAILURE,
  payload: item
});


export const restartUploadStatus = () => ({
  type: types.RESTART_UPLOAD_STATUS,
});
