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
export const getAllMenuPages = () => ({
  type: types.GET_ALL_MENUPAGES
});
export const getAllMenuPagesSuccess = (data) => ({
  type: types.GET_ALL_MENUPAGES_SUCCESS,
  payload: data
});
export const getMenu = () => ({
  type: types.GET_CMS_MENU
});
export const getMenuSuccess = (data) => ({
  type: types.GET_CMSMENU_SUCCESS,
  payload: data
});
export const getMenuFailure = (error) => ({
  type: types.GET_CMSMENU_FAILURE,
  payload: error
});
export const saveCmsMenu = (data) => ({
  type: types.SAVE_CMS_MENU,
  payload: data
});
export const saveCmsMenuSuccess = (data) => ({
  type: types.SAVE_CMSMENU_SUCCESS,
  payload: data
});
export const saveCmsMenuFailure = (error) => ({
  type: types.SAVE_CMSMENU_FAILURE,
  payload: error
});