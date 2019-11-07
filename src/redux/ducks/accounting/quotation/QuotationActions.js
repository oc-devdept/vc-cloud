

import * as types from './QuotationTypes'
/**
 * Change List View
 */
export const changeQuotationView = newValue => ({
  type: types.CHANGE_QUOTATION_LIST_VIEW,
  payload: newValue
});
/**
 * Toggle DropDown
 */
export const toggleQuotationDropDown = () => ({
  type: types.QUOTATION_LIST_DROPDOWN
});
/**
 * Toggle Summary List
 */
export const toggleQuotationSummary = () => ({
  type: types.TOGGLE_QUOTATION_SUMMARY
});

/**
 * Get Quotation Failure
 */
export const getQuotationFailure = error => ({
  type: types.GET_QUOTATION_FAILURE,
  payload: error
});

/**
 * Get Quotes Success
 */
export const getQuotationSuccess = data => ({
  type: types.GET_QUOTATION_SUCCESS,
  payload: data
});

/**
 * Get All Quotes
 */
export const getAllQuotation = () => ({
  type: types.GET_ALL_QUOTATION
});

/**
 * Get My Quotes
 */
export const getMyQuotation = () => ({
  type: types.GET_MY_QUOTATION
});

/**
 * Get Open Quotes
 */
export const getOpenQuotation = () => ({
  type: types.GET_OPEN_QUOTATION
});

/**
 * Get Closed Quotes
 */
export const getClosedQuotation = () => ({
  type: types.GET_CLOSED_QUOTATION
});

/**
 * Get Single Quote
 */
export const getSingleQuotation = (quoteID, edit, type) => ({
  type: types.GET_SINGLE_QUOTATION,
  payload: {quoteID, type},
  edit: edit
});
export const getSingleQuotationSuccess = quoteData => ({
  type: types.GET_SINGLE_QUOTATION_SUCCESS,
  payload: quoteData
});
export const clearSingleQuotation = () => ({
  type: types.CLEAR_SINGLE_QUOTATION
});

/**
 * Get Quote Summary
 */
export const getQuotationSummary = () => ({
  type: types.GET_QUOTE_SUMMARY
});
export const getQuotationSummarySuccess = data => ({
  type: types.GET_QUOTE_SUMMARY_SUCCESS,
  payload: data
});
export const getQuotationSummaryFailure = error => ({
  type: types.GET_QUOTE_SUMMARY_FAILURE,
  payload: error
});



/**
 * Notes
 */
export const addNoteQuotation = (id, note) => ({
  type: types.ADD_NOTE_QUOTATION,
  payload: { id, note }
});
export const addNoteQuotationSuccess = data => ({
  type: types.ADD_NOTE_QUOTATION_SUCCESS,
  payload: data
});
export const addNoteQuotationFailure = error => ({
  type: types.ADD_NOTE_QUOTATION_FAILURE,
  payload: error
});


/**
 * New Quote
 */
export const submitNewQuote = (item) => ({
  type: types.SUBMIT_QUOTATION,
  payload: item
});

export const submitNewQuoteSuccess = (item) => ({
  type: types.SUBMIT_QUOTATION_SUCCESS,
  payload: item,
});

export const submitNewQuoteFailure = (item) => ({
  type: types.SUBMIT_QUOTATION_FAILURE,
  payload: item
});

export const clearQuoteForm = () => ({
  type: types.CLEAR_QUOTATION_FORM
});

/**
 * Delete Quotation in DB
 */
export const deleteSingleQuote = (item) => ({
  type: types.DELETE_QUOTATION,
  payload: item
});

export const deleteSingleQuoteSuccess = (item) => ({
  type: types.DELETE_QUOTATION_SUCCESS,
  payload: item
});

export const deleteSingleQuoteFailure = (item) => ({
  type: types.DELETE_QUOTATION_FAILURE,
  payload: item
});


/**
 * Quote Product List
 */
export const addNewProdQuote = () => ({
  type: types.ADD_NEW_PRODUCT_QUOTATION
});
export const removeProdQuote = key => ({
  type: types.REMOVE_PRODUCT_QUOTATION,
  payload: key
});

/**
 * Handle Change
 */
export const handleProdQuote = (key, field, value) => ({
  type: types.HANDLE_PRODUCT_QUOTATION,
  payload: { key, field, value }
});
export const handleChangeQuote = (field, value) => ({
  type: types.HANDLE_CHANGE_QUOTATION,
  payload: { field, value }
});
export const handleRelatedQuotation = value => ({
  type: types.HANDLE_RELATED_TO_QUOTATION,
  payload: value
});
export const handleAttnToQuote = value => ({
  type: types.HANDLE_ATTN_TO_QUOTATION,
  payload: value
});
export const handleDisTaxQuote = (field, value) => ({
  type: types.HANDLE_DISCOUNT_TAX_QUOTATION,
  payload: { field, value }
});



/**
 * Update State Control
 */
export const HandleStateUpdate = (id, value, type) => ({
  type: types.HANDLE_STATE_UPDATE,
  payload: { id, value, type }
});

export const HandleStateUpdateSuccess = (data) => ({
  type: types.HANDLE_STATE_UPDATE_SUCCESS,
  payload: data
});

export const HandleStateUpdateFailure = (field, value) => ({
  type: types.HANDLE_STATE_UPDATE_FAILURE,
  payload: { field, value }
});

export const HandleStateCreateNewVersion = (id, value) => ({
  type: types.HANDLE_STATE_CREATE_NEW_VERSION,
  payload: { id, value }
});

export const HandleStateRevertPreviousVersion = (id, value) => ({
  type: types.HANDLE_STATE_REVERT_PREVIOUS_VERSION,
  payload: { id, value }
});

export const HandleConvertInvoiceQuotation = (id, value) => ({
  type: types.HANDLE_STATE_CONVERT_INVOICE_QUOTATION,
  payload: { id, value }
});



export const HandleQuotationAccounts = data => ({
  type: types.HANDLE_QUOTATION_ACCOUNTS,
  payload: data
});

export const HandleQuotationAccountsSuccess = data => ({
  type: types.HANDLE_QUOTATION_ACCOUNTS_SUCCESS,
  payload: data
});

export const HandleQuotationAccountsFailure = data => ({
  type: types.HANDLE_QUOTATION_ACCOUNTS_FAILTURE,
  payload: data
});


export const submitNewQuotation = (formFields) => ({
  type: types.SUBMIT_NEW_QUOTATION,
  payload: formFields
});

export const submitNewQuotationSuccess = () => ({
  type: types.SUBMIT_NEW_QUOTATION_SUCCESS
});

export const submitNewQuotationFailure = () => ({
  type: types.SUBMIT_NEW_QUOTATION_FAILURE
});

export const restartUploadQuotationStatus = () => ({
  type: types.RESTART_QUOTATION_UPLOAD_STATUS,
});

