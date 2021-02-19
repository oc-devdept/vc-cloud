/**
 * Redux App Settings Actions
 */
import * as types from "./CalendarTypes";

/**
 * Get All Events
 */
export const getAllEvents = (filter, start, end) => ({
  type: types.GET_ALL_EVENTS,
  payload: {
    filter,
    start,
    end
  }
});

export const getEventsSearch = (filter, state) => ({
  type: types.GET_EVENT_SEARCH,
  payload: {
    filter,
    state
  }
});

export const getAllEventsSuccess = (events, myEvents) => ({
  type: types.GET_ALL_EVENTS_SUCCESS,
  payload: { events, myEvents }
});
export const getAllEventsFailure = (events, myEvents) => ({
  type: types.GET_ALL_EVENTS_FAILURE,
  payload: { events, myEvents }
});

export const getAllUpcoming = (filter, start, end) => ({
  type: types.GET_ALL_UPCOMING_EVENTS,
  payload: {
    filter,
    start,
    end
  }
});
export const getAllUpcomingEventSuccess = (events, myEvents) => ({
  type: types.GET_ALL_UPCOMING_EVENTS_SUCCESS,
  payload: { events, myEvents}
});

/** 
 *  Calendar settings
 * **/
export const getCalendarSettings = () => ({
  type: types.GET_CALENDARSETTINGS
});

export const getCalendarSettingsSuccess = settings => ({
  type: types.GET_CALENDARSETTINGS_SUCCESS,
  payload: settings
});

export const getCalendarSettingsFailure = error => ({
  type: types.GET_CALENDARSETTINGS_FAILURE,
  payload: error
});

export const updateCalendarSettings = (data) =>  ({
  type: types.UPDATE_CALENDARSETTINGS,
  payload: data
})
export const updateCalendarSettingsSuccess = (data) => ({
  type: types.UPDATE_CALENDARSETTINGS_SUCCESS,
  payload: data
});
export const updateCalendarSettingsFailure = error => ({
  type: types.UPDATE_CALENDARSETTINGS_FAILURE,
  payload: error
});
export const newCalendarSetting = (data) =>  ({
  type: types.NEW_CALENDARSETTING,
  payload: data
})
export const newCalendarSettingSuccess = (data) => ({
  type: types.NEW_CALENDARSETTING_SUCCESS,
  payload: data
});
export const newCalendarSettingFailure = error => ({
  type: types.NEW_CALENDARSETTING_FAILURE,
  payload: error
});
export const deleteCalendarSetting = (id) =>  ({
  type: types.DELETE_CALENDARSETTING,
  payload: id
})
export const deleteCalendarSettingSuccess = (data) => ({
  type: types.DELETE_CALENDARSETTING_SUCCESS,
  payload: data
});
export const deleteCalendarSettingFailure = error => ({
  type: types.DELETE_CALENDARSETTING_FAILURE,
  payload: error
});
/**
 * Add Events
 */
export const onChangeAddEvent = (field, value) => ({
  type: types.ON_CHANGE_ADD_EVENT,
  payload: { field, value }
});
export const addEvent = (item, type) => ({
  type: types.ADD_EVENT,
  payload: { item, type }
});
export const addEventSuccess = event => ({
  type: types.ADD_EVENT_SUCCESS,
  payload: event
});
export const addEventFailure = err => ({
  type: types.ADD_EVENT_FAILURE,
  payload: err
});

export const deleteEvent = id => ({
  type: types.DELETE_EVENT,
  payload: id
});

/**
 * Delete Events
 */
export const deleteEventSuccess = item => ({
  type: types.DELETE_EVENT_SUCCESS,
  payload: item
});

export const deleteEventFailure = item => ({
  type: types.DELETE_EVENT_FAILURE,
  payload: item
});

/**
 * Update Events
 */
export const updateEvent = id => ({
  type: types.UPDATE_EVENT,
  payload: id
});

export const updateEventSuccess = item => ({
  type: types.UPDATE_EVENT_SUCCESS,
  payload: item
});

export const updateEventFailure = item => ({
  type: types.UPDATE_EVENT_FAILURE,
  payload: item
});

/**
 * Get Event Failure
 */
export const getEventFailure = err => ({
  type: types.GET_EVENT_FAILURE,
  payload: err
});
