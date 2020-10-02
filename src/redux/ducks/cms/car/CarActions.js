import * as types from "./CarTypes";

export const getAllCar = () => ({
  type: types.GET_ALL_CAR
});
export const getAllCarSuccess = data => ({
  type: types.GET_ALL_CAR_SUCCESS,
  payload: data
});
export const getAllCarFailure = error => ({
  type: types.GET_ALL_CAR_FAILURE,
  payload: error
});

//get category
export const getCategory = () => ({
  type: types.GET_CATEGORY
});
export const getCategorySuccess = data => ({
  type: types.GET_CATEGORY_SUCCESS,
  payload: data
});
export const getCategoryFailure = error => ({
  type: types.GET_CATEGORY_FAILURE,
  payload: error
});

//get products
export const getProducts = () => ({
  type: types.GET_PRODUCTS
});
export const getProductsSuccess = data => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: data
});
export const getProductsFailure = error => ({
  type: types.GET_PRODUCTS_FAILURE,
  payload: error
});
