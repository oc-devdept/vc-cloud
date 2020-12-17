import * as types from "./FollowupTypes";

/**
 * Get Followup results
 */
export const getFollowupResult = () => ({
  type: types.GET_FOLLOWUP_RESULT,
});
export const getFollowupResultSuccess = (data) => ({
  type: types.GET_FOLLOWUP_RESULT_SUCCESS,
  payload: data,
});
export const getFollowupResultFailure = (error) => ({
  type: types.GET_FOLLOWUP_RESULT_FAILURE,
  payload: error,
});

export const newFollowupResult = (data) => ({
  type: types.ADD_FOLLOWUP_RESULT,
  payload: data,
});
export const newFollowupResultSuccess = (data) => ({
  type: types.ADD_FOLLOWUP_RESULT_SUCCESS,
  payload: data,
});
export const newFollowupResultFailure = (error) => ({
  type: types.ADD_FOLLOWUP_RESULT_FAILURE,
  payload: error,
});

export const editFollowupResult = (data) => ({
  type: types.EDIT_FOLLOWUP_RESULT,
  payload: data,
});
export const editFollowupResultSuccess = (data) => ({
  type: types.EDIT_FOLLOWUP_RESULT_SUCCESS,
  payload: data,
});
export const editFollowupResultFailure = (error) => ({
  type: types.EDIT_FOLLOWUP_RESULT_FAILURE,
  payload: error,
});

export const deleteFollowupResult = (data) => ({
  type: types.DELETE_FOLLOWUP_RESULT,
  payload: data,
});
export const deleteFollowupResultSuccess = (data) => ({
  type: types.DELETE_FOLLOWUP_RESULT_SUCCESS,
  payload: data,
});
export const deleteFollowupResultFailure = (error) => ({
  type: types.DELETE_FOLLOWUP_RESULT_FAILURE,
  payload: error,
});

/**
 * Get Followup types
 */
export const getFollowupType = () => ({
  type: types.GET_FOLLOWUP_TYPE,
});
export const getFollowupTypeSuccess = (data) => ({
  type: types.GET_FOLLOWUP_TYPE_SUCCESS,
  payload: data,
});
export const getFollowupTypeFailure = (error) => ({
  type: types.GET_FOLLOWUP_TYPE_FAILURE,
  payload: error,
});

export const newFollowupType = (data) => ({
  type: types.ADD_FOLLOWUP_TYPE,
  payload: data,
});
export const newFollowupTypeSuccess = (data) => ({
  type: types.ADD_FOLLOWUP_TYPE_SUCCESS,
  payload: data,
});
export const newFollowupTypeFailure = (error) => ({
  type: types.ADD_FOLLOWUP_TYPE_FAILURE,
  payload: error,
});

export const editFollowupType = (data) => ({
  type: types.EDIT_FOLLOWUP_TYPE,
  payload: data,
});
export const editFollowupTypeSuccess = (data) => ({
  type: types.EDIT_FOLLOWUP_TYPE_SUCCESS,
  payload: data,
});
export const editFollowupTypeFailure = (error) => ({
  type: types.EDIT_FOLLOWUP_TYPE_FAILURE,
  payload: error,
});

export const deleteFollowupType = (data) => ({
  type: types.DELETE_FOLLOWUP_TYPE,
  payload: data,
});
export const deleteFollowupTypeSuccess = (data) => ({
  type: types.DELETE_FOLLOWUP_TYPE_SUCCESS,
  payload: data,
});
export const deleteFollowupTypeFailure = (error) => ({
  type: types.DELETE_FOLLOWUP_TYPE_FAILURE,
  payload: error,
});

/**
 * Create new follow up
 */
export const newFollowUp = (data) => ({
  type: types.NEW_FOLLOWUP,
  payload: data,
});
export const newFollowUpSuccess = (data) => ({
  type: types.NEW_FOLLOWUP_SUCCESS,
  payload: data,
});
export const newFollowUpFailure = (error) => ({
  type: types.NEW_FOLLOWUP_FAILURE,
  payload: error,
});

/**
 * Edit follow up
 */
export const editFollowUp = (data) => ({
  type: types.EDIT_FOLLOWUP,
  payload: data,
});
export const editFollowUpSuccess = (data) => ({
  type: types.EDIT_FOLLOWUP_SUCCESS,
  payload: data,
});
export const editFollowUpFailure = (error) => ({
  type: types.EDIT_FOLLOWUP_FAILURE,
  payload: error,
});

/**
 * Edit FOLLOW UP COMPLETE
 */
export const editFollowUpComplete = (data) => ({
  type: types.EDIT_FOLLOWUP_COMPLETE,
  payload: data,
});
export const editFollowUpCompleteSuccess = (data) => ({
  type: types.EDIT_FOLLOWUP_COMPLETE_SUCCESS,
  payload: data,
});
export const editFollowUpCompleteFailure = (error) => ({
  type: types.EDIT_FOLLOWUP_COMPLETE_FAILURE,
  payload: error,
});
/**
 * Edit follow up
 */
export const deleteFollowUp = (id) => ({
  type: types.DELETE_FOLLOWUP,
  payload: id,
});
export const deleteFollowUpSuccess = (id) => ({
  type: types.DELETE_FOLLOWUP_SUCCESS,
  payload: id,
});
export const deleteFollowUpFailure = (error) => ({
  type: types.DELETE_FOLLOWUP_FAILURE,
  payload: error,
});

/*
 * Get All TEMPLATE
 */
export const getFilterFollowup = (
  limit,
  skip,
  filter,
  searchText,
  orderBy,
  custId
) => ({
  type: types.GET_FILTER_FOLLOWUP,
  payload: { limit, skip, filter, searchText, orderBy, custId },
});
export const getFilterFollowupSuccess = (data) => ({
  type: types.GET_FILTER_FOLLOWUP_SUCCESS,
  payload: data,
});
export const getFilterFollowupFailure = (error) => ({
  type: types.GET_FILTER_FOLLOWUP_FAILURE,
  payload: error,
});

// /**
//  * Check Follow up complete
//  */
// export const checkFollowupComplete = data => ({
//   type: types.CHECK_FOLLOWUP_COMPLETE,
//   payload: data
// });
// export const checkFollowupCompleteSuccess = data => ({
//   type: types.CHECK_FOLLOWUP_COMPLETE_SUCCESS,
//   payload: data
// });
// export const checkFollowupCompleteFailure = error => ({
//   type: types.CHECK_FOLLOWUP_COMPLETE_FAILURE,
//   payload: error
// });
