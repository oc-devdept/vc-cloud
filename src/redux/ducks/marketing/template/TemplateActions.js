import * as types from "./TemplateTypes";

/**
 * Get All Campaign
 */
export const getAllTemplate = () => ({
  type: types.GET_ALL_TEMPLATE
});
export const getAllTemplateSuccess = data => ({
  type: types.GET_ALL_TEMPLATE_SUCCESS,
  payload: data
});
export const getAllTemplateFailure = error => ({
  type: types.GET_ALL_TEMPLATE_FAILURE,
  payload: error
});

/**
 * Add Campaign Email Template
 */
export const addTemplate = data => ({
  type: types.ADD_TEMPLATE,
  payload: data
});
export const addTemplateSuccess = data => ({
  type: types.ADD_TEMPLATE_SUCCESS,
  payload: data
});
export const addTemplateFailure = error => ({
  type: types.ADD_TEMPLATE_FAILURE,
  payload: error
});

/**
 * Update Campaign Email Template
 */
export const updateTemplate = data => ({
  type: types.UPDATE_TEMPLATE,
  payload: data
});
export const updateTemplateSuccess = data => ({
  type: types.UPDATE_TEMPLATE_SUCCESS,
  payload: data
});
export const updateTemplateFailure = error => ({
  type: types.UPDATE_TEMPLATE_FAILURE,
  payload: error
});
