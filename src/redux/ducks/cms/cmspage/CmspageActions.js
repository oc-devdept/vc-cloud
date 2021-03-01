import * as types from "./CmspageTypes";

//get all blog
export const getAllCmspage = () => ({
  type: types.GET_ALL_CMSPAGES
});
export const getAllCmspagesSuccess = data => ({
  type: types.GET_ALL_CMSPAGES_SUCCESS,
  payload: data
});
export const getAllCmspagesFailure = error => ({
  type: types.GET_ALL_CMSPAGES_FAILURE,
  payload: error
});

//get single blog
export const getCmspage = (id) => ({
  type: types.GET_SINGLE_CMSPAGE,
  payload: id
});
export const getSingleCmspageSuccess = data => ({
  type: types.GET_SINGLE_CMSPAGE_SUCCESS,
  payload: data
});
export const getSingleCmspageFailure = error => ({
  type: types.GET_SINGLE_CMSPAGE_FAILURE,
  payload: error
});

//update single page
export const updateCmspage = (data) => ({
  type: types.UPDATE_CMSPAGE,
  payload: data
})
export const updateCmspageSuccess = (data) => ({
  type: types.UPDATE_CMSPAGE_SUCCESS,
  payload: data
});
export const updateCmspageFailure = (error) => ({
  type: types.UPDATE_CMSPAGE_FAILURE,
  payload: data
});

//create new blog
export const newCmspage = (data) => ({
  type: types.NEW_CMSPAGE,
  payload: data
});
export const newCmspageSuccess = data => ({
  type: types.NEW_CMSPAGE_SUCCESS,
  payload: data
});
export const newCmspageFailure = error => ({
  type: types.NEW_CMSPAGE_FAILURE,
  payload: error
});

export const deleteCmspage = (id) => ({
  type: types.DELETE_CMSPAGE,
  payload: id
});
export const deleteCmspageSuccess = (id) => ({
  type: types.DELETE_CMSPAGE_SUCCESS,
  payload: id
});
export const deleteCmspageFailure = (error) => ({
  type: types.DELETE_CMSPAGE_FAILURE,
  payload: error
});