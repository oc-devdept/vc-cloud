import * as types from "./ProductTypes";

export const getAllProducts = () => ({
    type: types.GET_ALL_PRODUCTS
});
export const getAllProductsSuccess = data => ({
    type: types.GET_ALL_PRODUCTS_SUCCESS,
    payload: data
});
export const getAllProductsFailure = error => ({
    type: types.GET_ALL_PRODUCTS_FAILURE,
    payload: error
});