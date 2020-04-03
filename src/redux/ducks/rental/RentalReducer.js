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
    case types.DELETE_RENTAL_CAR:
      return { ...state, loading: true };

    // get rental
    case types.GET_RENTAL_CAR_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case types.GET_RENTAL_CAR_FAILURE:
      NotificationManager.error("Error in getting rental cars");
      return { ...state, loading: false };

    // get rental categories
    case types.GET_RENTAL_CATEGORY_SUCCESS:
      return { ...state, categories: action.payload };
    case types.GET_RENTAL_CATEGORY_FAILURE:
      NotificationManager.error("Error in getting categories");
      return { ...state };

    // Delete rental
    case types.DELETE_RENTAL_CAR_SUCCESS:
      NotificationManager.success("Rental Car Deleted");
      const deleteRental = Object.assign([], state.list).filter(
        rent => rent.id != action.payload
      );
      return { ...state, loading: false, list: deleteRental };
    case types.DELETE_RENTAL_CAR_FAILURE:
      NotificationManager.error("Error deleting rental car");
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
