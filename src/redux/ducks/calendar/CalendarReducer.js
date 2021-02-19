/**
 * Calendar Reducers
 */
import { AllOut, UpdateRounded } from "@material-ui/icons";
import { NotificationManager } from "react-notifications";
import * as Types from "./CalendarTypes";

const INIT_STATE = {
  eventAdd: {},
  isAddEvent: false,
  slotSelected: null,
  isSlotSelected: false,
  dayView: new Date(),
  viewIndex: 0,
  eventView: "My Calendar",
  eventViewOptions: ["My Calendar", "Company Calendar"],
  myEvents: [],
  allEvents: [],
  showEvents: [],
  upcomingEvents: [],
  settings: [],
  eventsLoading: false
};
let allShowEvents = [];
export default (state = INIT_STATE, action) => {
  let showEvents = [...state.showEvents];


  switch (action.type) {

    /**
     * Get All Events
     */
    case Types.GET_ALL_EVENTS:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.GET_ALL_EVENTS_SUCCESS:

      var events = action.payload.events.data; //.data

      var displayEvents = Object.values(events);

      allShowEvents = displayEvents;
      return {
        ...state,
        allEvents: displayEvents, //action.payload.events
        myEvents: displayEvents, //action.payload.myEvents
        showEvents: displayEvents, //action.payload.myEvents
        eventsLoading: false
      };
    case Types.GET_ALL_UPCOMING_EVENTS_SUCCESS:
      var events = action.payload.events.data; //.data
      var displayEvents = Object.values(events);
      allShowEvents = displayEvents;
      return {
        ...state,
        upcomingEvents: displayEvents        
      };

    case Types.GET_EVENT_FAILURE:
      //NotificationManager.warning("Failed to get events from database.");
      return {
        ...state,
        eventsLoading: false
      };

    /**
     * Add Event
     */
    case Types.GET_EVENT_SEARCH:

      let searchEvents = [];
      
      for (let i = 0; i < allShowEvents.length; i++) {
        if(action.payload.state == "title"){
          if (
            allShowEvents[i].title.toLowerCase().indexOf(action.payload.filter.toLowerCase()) >
            -1
          ) {
            searchEvents.push(allShowEvents[i]);
          }
        }
        else if(action.payload.state == "type"){
          if(action.payload.filter.includes(allShowEvents[i].eventableType) || action.payload.filter.includes(allShowEvents[i].service)){
            searchEvents.push(allShowEvents[i]);
          }
        }
         
          // console.log(allShowEvents[i].title)
        
      }

      return {
        ...state,
        showEvents: searchEvents
      };

    case Types.ADD_EVENT:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.ADD_EVENT_SUCCESS:
      NotificationManager.success("Event Added");
      let event = action.payload;
      showEvents.push(event);
      allShowEvents = showEvents;
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        showEvents: showEvents
      };
    case Types.ADD_EVENT_FAILURE:
      NotificationManager.warning("Failed to Add Event");
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false
      };

    /**
     * Delete Event
     */
    case Types.DELETE_EVENT:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.DELETE_EVENT_SUCCESS:
      NotificationManager.success("Event has been sucessfully deleted");
      showEvents = showEvents.filter(e => e.id != action.payload);
      allShowEvents = showEvents;
      return {
        ...state,
        showEvents: showEvents,
        eventsLoading: true
      };
    case Types.DELETE_EVENT_FAILURE:
      NotificationManager.warning(
        action.payload + ". " + "As you might have deleted before"
      );
      console.log(action.payload);
      return {
        ...state,
        eventsLoading: true
      };

    /**
     * Update Event
     */
    case Types.UPDATE_EVENT_SUCCESS:
      NotificationManager.success("Event Updated");
      let updateEvent = action.payload.data;
      let data = showEvents.map(item => {
        if (item.id == updateEvent.id) {
          item = updateEvent;
          item.start = new Date(updateEvent.start);
          item.end = new Date(updateEvent.end);
          return item;
        } else {
          return item;
        }
      });
      allShowEvents = showEvents;
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        showEvents: data
      };
    case Types.UPDATE_EVENT_FAILURE:
      NotificationManager.warning("Failed to Update Event");
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false
      };
    case Types.GET_CALENDARSETTINGS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        settings: action.payload
      };
    case Types.GET_CALENDARSETTINGS_FAILURE:
      NotificationManager.warning("Failed to load Calendar settings");
      return {
        ...state
      }
    case Types.NEW_CALENDARSETTING_SUCCESS:
        NotificationManager.success("Setting Added");
        let settings = [...state.settings];
        settings.push(action.payload);
        console.log(settings);
        return {
          ...state,          
          settings: settings
        };
    case Types.NEW_CALENDARSETTING_FAILURE:
      
      NotificationManager.warning("Failed to add Calendar settings");
      return {
        ...state
      }
    case Types.UPDATE_CALENDARSETTINGS_SUCCESS:
      NotificationManager.success("Setting Updated");
      let updateSetting = action.payload;
      settings = [...state.settings];
      data = settings.map(item => {
        if (item.id == updateSetting.id) {          
          return updateSetting;
        } else {
          return item;
        }
      });
      return {
        ...state,
        settings: data
      }
    case Types.UPDATE_CALENDARSETTINGS_FAILURE:      
        NotificationManager.warning("Failed to edit Calendar settings");
        return {
          ...state
        }
    case Types.DELETE_CALENDARSETTING_SUCCESS:
      NotificationManager.success("Setting has been sucessfully deleted");
      console.log(action.payload);
      settings = state.settings.filter(e => e.id != action.payload);
      return {
        ...state,
        settings: settings
      };
    case Types.DELETE_CALENDARSETTING_FAILURE:
      NotificationManager.warning("Failed to delete Calendar settings");
        return {
          ...state
        }

    default:
      return { ...state };
  }
};
