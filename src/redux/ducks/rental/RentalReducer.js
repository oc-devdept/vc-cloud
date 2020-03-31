import * as types from "./RentalTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  list: [],
  loading: false,
  categories: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // loading
    case types.GET_RENTAL_CAR:
      return { ...state, loading: true };

    // get rental
    case types.GET_RENTAL_CAR_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case types.GET_RENTAL_CAR_FAILURE:
      NotificationManager.error("Error in getting rental cars");
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
