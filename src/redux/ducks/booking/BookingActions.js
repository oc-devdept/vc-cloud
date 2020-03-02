import * as types from "./BookingTypes";

export const getRecentBookings = (type, id) => ({
  type: types.GET_RECENT_BOOKINGS,
  payload: { type, id }
});
export const getRecentBookingsSuccess = data => ({
  type: types.GET_RECENT_BOOKINGS_SUCCESS,
  payload: data
});
export const getRecentBookingsFailure = error => ({
  type: types.GET_RECENT_BOOKINGS_FAILURE,
  payload: error
});
