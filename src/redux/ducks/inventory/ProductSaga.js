import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import api from "Api";

import {
    GET_ALL_PRODUCTS
} from "./ProductTypes";
import * as actions from "./ProductActions";

const getAllProductRequest = async() => {
    const result = await api.get("/products/allproducts");
    return result.data;
}
function* getAllProductFromDB(){
    try{
        const data = yield call(getAllProductRequest);
        yield put(actions.getAllProductsSuccess(data));
    }
    catch(error){
        yield put(actions.getAllProductsFailure(error));
    }
}
export function* getAllProductWatcher(){
    yield takeEvery(GET_ALL_PRODUCTS, getAllProductFromDB);
}

export default function* rootSaga(){
    yield all([
        fork(getAllProductWatcher)
    ])
}