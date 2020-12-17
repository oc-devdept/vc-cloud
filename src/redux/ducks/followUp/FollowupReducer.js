import { NotificationManager } from "react-notifications";
import * as types from "./FollowupTypes";

const INIT_STATE = {
  followupResult: [],
  followupType: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.ADD_FOLLOWUP_RESULT:
    case types.EDIT_FOLLOWUP_RESULT:
    case types.GET_FOLLOWUP_RESULT:
    case types.ADD_FOLLOWUP_TYPE:
    case types.EDIT_FOLLOWUP_TYPE:
    case types.GET_FOLLOWUP_TYPE:
      return { ...state, loading: true}

    /**
     * Get follow up result
     */
    case types.GET_FOLLOWUP_RESULT_SUCCESS:
      return { ...state, loading: false, followupResult: action.payload };
    case types.GET_FOLLOWUP_RESULT_FAILURE:
      NotificationManager.warning("Error retrieving follow-up results");
      return { ...state, loading: false };    

    /**
     * Get follow up type
     */
    case types.GET_FOLLOWUP_TYPE_SUCCESS:
      return { ...state, followupType: action.payload, loading: false };
    case types.GET_FOLLOWUP_TYPE_FAILURE:
      NotificationManager.warning("Error retrieving follow-up type");
      return { ...state, loading: true };
    case types.EDIT_FOLLOWUP_COMPLETE:
      return {
        ...state,
        loading: false
      };
    case types.EDIT_FOLLOWUP_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false
      };

    /**
     * post/delete follow up
     */
    case types.DELETE_FOLLOWUP_FAILURE:
    case types.NEW_FOLLOWUP_FAILURE:

    case types.EDIT_FOLLOWUP_FAILURE:
    case types.EDIT_FOLLOWUP_COMPLETE_FAILURE:
      NotificationManager.warning("Error with follow up action");
      
      return { ...state, loading:false };

    default:
      return { ...state };
  }
};
