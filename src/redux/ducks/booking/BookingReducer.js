import * as types from "./BookingTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  recentBookings: {
    loading: false,
    listData: [],
    chartData: []
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_RECENT_BOOKINGS:
      return {
        ...state,
        recentBookings: { ...state.recentBookings, loading: true }
      };
    case types.GET_RECENT_BOOKINGS_SUCCESS:
      const { recentBooking, overview } = action.payload;
      return {
        ...state,
        recentBookings: {
          ...state.recentBookings,
          loading: false,
          listData: recentBooking,
          chartData: overview
        }
      };
    case types.GET_RECENT_BOOKINGS_FAILURE:
      NotificationManager.error("Error in retreiving recent bookings");
      return {
        ...state,
        recentBookings: { ...state.recentBookings, loading: false }
      };
    default:
      return { ...state };
  }
};
