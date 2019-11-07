import * as types from "./DealTypes";
/**
 * Change List View
 */
export const changeDealView = newValue => ({
  type: types.CHANGE_DEAL_LIST_VIEW,
  payload: newValue
});

/**
 * Get DEAL Failure
 */
export const getDealFailure = error => ({
  type: types.GET_DEAL_FAILURE,
  payload: error
});

/**
 * Get DEAL Success
 */
export const getDealSuccess = data => ({
  type: types.GET_DEAL_SUCCESS,
  payload: data
});

/**
 * Get All DEALs
 */
export const getAllDeal = () => ({
  type: types.GET_ALL_DEAL
});

/**
 * Get My DEALs
 */
export const getMyDeal = () => ({
  type: types.GET_MY_DEAL
});

/**
 * Get Open DEALs
 */
export const getOpenDeal = () => ({
  type: types.GET_OPEN_DEAL
});

/**
 * Get Closed DEALs
 */
export const getClosedDeal = () => ({
  type: types.GET_CLOSED_DEAL
});

/**
 * Get Won DEALs
 */
export const getWonDeal = () => ({
  type: types.GET_WON_DEAL
});

/**
 * Get Single Deal
 */
export const getSingleDeal = dealId => ({
  type: types.GET_SINGLE_DEAL,
  payload: dealId
});
export const getSingleDealSuccess = dealData => ({
  type: types.GET_SINGLE_DEAL_SUCCESS,
  payload: dealData
});
export const clearSingleDeal = () => ({
  type: types.CLEAR_SINGLE_DEAL
});

/**
 * Get Deal Summary
 */
export const getDealSummary = () => ({
  type: types.GET_DEAL_SUMMARY
});
export const getDealSummarySuccess = data => ({
  type: types.GET_DEAL_SUMMARY_SUCCESS,
  payload: data
});
export const getDealSummaryFailure = error => ({
  type: types.GET_DEAL_SUMMARY_FAILURE,
  payload: error
});

/**
 * New Deal
 */

export const newDeal = (form, redirect, history) => ({
  type: types.NEW_DEAL,
  payload: { form, redirect, history }
});

export const newDealSuccess = data => ({
  type: types.NEW_DEAL_SUCCESS,
  payload: data
});
export const newDealFailure = error => ({
  type: types.NEW_DEAL_FAILURE,
  payload: error
});

/**
 * Edit
 */
export const editDeal = form => ({
  type: types.EDIT_DEAL,
  payload: form
});
export const editDealSuccess = data => ({
  type: types.EDIT_DEAL_SUCCESS,
  payload: data
});
export const editDealFailure = error => ({
  type: types.EDIT_DEAL_FAILURE,
  payload: error
});

/**
 * Form Fields
 */
export const getDealFormFields = () => ({
  type: types.GET_DEAL_FORM_FIELDS
});
export const getDealFormSuccess = fields => ({
  type: types.GET_DEAL_FORM_SUCCESS,
  payload: fields
});
export const getDealFormFailure = error => ({
  type: types.GET_DEAL_FORM_FAILURE,
  payload: error
});

/**
 * Handle Deal Stage
 */
export const onClickStep = step => ({
  type: types.ON_CLICK_STEP,
  payload: step
});
export const setCurrentStep = currentStep => ({
  type: types.SET_CURRENT_STEP,
  payload: currentStep
});
export const onChangeStepState = () => ({
  type: types.ON_CHANGE_STEP_STATE
});
export const submitNewStage = (dealID, stageID) => ({
  type: types.ON_SUBMIT_NEW_STAGE,
  payload: { dealID, stageID }
});
export const newStageSuccess = deal => ({
  type: types.ON_SUBMIT_NEW_STAGE_SUCCESS,
  payload: deal
});
export const newStageFailure = error => ({
  type: types.ON_SUBMIT_NEW_STAGE_FAILURE,
  payload: error
});

/**
 * Delete
 */
export const deleteDeal = id => ({
  type: types.DELETE_DEAL,
  payload: id
});
export const deleteDealSuccess = id => ({
  type: types.DELETE_DEAL_SUCCESS,
  payload: id
});
export const deleteDealFailure = error => ({
  type: types.DELETE_DEAL_FAILURE,
  payload: error
});

/**
 * Notes
 */
export const addNoteDeal = (id, note) => ({
  type: types.ADD_NOTE_DEAL,
  payload: { id, note }
});
export const addNoteDealSuccess = data => ({
  type: types.ADD_NOTE_DEAL_SUCCESS,
  payload: data
});
export const addNoteDealFailure = error => ({
  type: types.ADD_NOTE_DEAL_FAILURE,
  payload: error
});

/**
 * Transfer
 */
export const transferDeal = (id, newOwner, history) => ({
  type: types.TRANSFER_DEAL,
  payload: { id, newOwner, history }
});
export const transferDealSuccess = data => ({
  type: types.TRANSFER_DEAL_SUCCESS,
  payload: data
});
export const transferDealFailure = error => ({
  type: types.TRANSFER_DEAL_FAILURE,
  payload: error
});

/**
 * Event
 */
export const addDealEvent = data => ({
  type: types.ADD_DEAL_EVENT,
  payload: data
});
