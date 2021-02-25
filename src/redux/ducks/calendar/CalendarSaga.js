import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as Types from "./CalendarTypes";
import * as Actions from "./CalendarActions";

import api from "Api";

//=========================
// REQUESTS
//=========================

const getAllEventsRequest = async (data) => {
  try {
    const result = await api.post("/events/getAllEvents", {data: data});

    return result.data;
  } catch (err) {
    return err;
  }
};
const addEventRequest = async (newEvent) => {
  try {

    const result = await api.post("/events/customCreate", { data: newEvent });
    return result.data.data;
  } catch (err) {
    return err;
  }
};
const deleteEventRequest = async id => {
  try {
    const result = await api.post(`/events/customDelete`, { data: id });    
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};
const updateEventRequest = async data => {
  try {
    const result = await api.post(`/events/customEdit`, { data });
    //const result = await api.patch(`/events/?id=${id.id}`, id);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};
const getCalendarSettingsRequest = async () => {
  try {
    const result = await api.get("/calendarsettings");
    return result.data;
  } catch(err) {
    return err;
  }
}

const updateCalendSettingsRequest = async data => {
  try {
    const result = await api.patch("/calendarsettings", data);
    return result;
  } catch(err) {
    return err;
  }
}
const postCalendarSettings = async data => {
  try {
    const result = await api.post("/calendarsettings", data);
    return result.data;
  } catch(err) {
    return err;
  }
}
const deleteCalendarSettingRequest = async id => {
  try {
    const result = await api.delete(`/calendarsettings/${id}`);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
}

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllEventsFromDB(item) {
  const { payload } = item;

    try {
      let event = [];
      //let testevent = myEvents;
      let myEvents = yield call(getAllEventsRequest, payload);
      myEvents.data.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
      });

      yield put(Actions.getAllEventsSuccess(myEvents, myEvents));
    } catch (err) {
      console.log(err);
      yield put(Actions.getEventFailure(err));
    }  
}

function* getAllUpcomingEventsFromDB({ payload }) {

    try {
      let event = [];
      //let testevent = myEvents;
      let myEvents = yield call(getAllEventsRequest, payload);
      myEvents.data.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
      });
      yield put(Actions.getAllUpcomingEventSuccess(myEvents, myEvents));
    } catch (err) {
      console.log(err);
      yield put(Actions.getEventFailure(err));
    }  
}

function* addEventToDB({ payload }) {
  const { item } = payload;
  try {
    const data = yield call(addEventRequest, item);
    
    yield put(Actions.addEventSuccess(data));
    
  } catch (err) {
    yield put(Actions.addEventFailure(err));
  }
}

function* deleteEventFromDB(item) {
  try {
    const data = yield call(deleteEventRequest, item.payload); 
    /*   
    if (!data.count == 1) {
      throw "Item could not be deleted";
    }
    */
    yield put(Actions.deleteEventSuccess(item.payload));
  } catch (err) {
    yield put(Actions.deleteEventFailure(err));
  }
}
function* updateEventFromDB(item) {
  try {
    const data = yield call(updateEventRequest, item.payload);
    yield put(Actions.updateEventSuccess(data));
  } catch (err) {
    yield put(Actions.updateEventFailure(err));
  }
}
function* getCalendarSettingsFromDB(){
  try {
    const data = yield call(getCalendarSettingsRequest);
    yield put(Actions.getCalendarSettingsSuccess(data));    
  } catch(err) {
    yield put(Actions.getCalendarSettingsFailure(err));
  }
}
function* updateCalendarSettingsFromDB(item) {
  try {
    const data = yield call(updateCalendSettingsRequest, item.payload);
    yield put(Actions.updateCalendarSettingsSuccess(data));    
  } catch (err) {
    yield put(Actions.updateCalendarSettingsFailure(err));
  }
}
function* addCalSettingToDB({ payload }) {
  //const { item } = payload;
  try {
    const data = yield call(postCalendarSettings, payload);
    
    yield put(Actions.newCalendarSettingSuccess(data));
    
  } catch (err) {
    yield put(Actions.newCalendarSettingFailure(err));
  }
}

function* deleteCalendarSettingFromDB(item) {
  try {
    const data = yield call(deleteCalendarSettingRequest, item.payload);   
    yield put(Actions.deleteCalendarSettingSuccess(item.payload));
  } catch (err) {    
    yield put(Actions.deleteCalendarSettingFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllEventsWatcher() {
  yield takeEvery(Types.GET_ALL_EVENTS, getAllEventsFromDB);
}
export function* getAllUpcomingEventsWatcher(){
  yield takeEvery(Types.GET_ALL_UPCOMING_EVENTS, getAllUpcomingEventsFromDB);
}
export function* addEventWatcher() {
  yield takeEvery(Types.ADD_EVENT, addEventToDB);
}
export function* deleteEventWatcher() {
  yield takeEvery(Types.DELETE_EVENT, deleteEventFromDB);
}

export function* updateEventWatcher() {
  yield takeEvery(Types.UPDATE_EVENT, updateEventFromDB);
}
export function* getCalendarSettingsWatcher(){
  yield takeEvery(Types.GET_CALENDARSETTINGS, getCalendarSettingsFromDB);
}
export function* updateCalendarSettingsWatcher() {
  yield takeEvery(Types.UPDATE_CALENDARSETTINGS, updateCalendarSettingsFromDB);
}
export function* newCalendarSettingsWatcher() {
  yield takeEvery(Types.NEW_CALENDARSETTING, addCalSettingToDB);
}
export function* deleteCalendarSettingsWatcher() {
  yield takeEvery(Types.DELETE_CALENDARSETTING, deleteCalendarSettingFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([    
    fork(getAllEventsWatcher),
    fork(getAllUpcomingEventsWatcher),
    fork(addEventWatcher),
    fork(deleteEventWatcher),
    fork(updateEventWatcher),
    fork(getCalendarSettingsWatcher),
    fork(updateCalendarSettingsWatcher),
    fork(newCalendarSettingsWatcher),
    fork(deleteCalendarSettingsWatcher),
  ]);
}
