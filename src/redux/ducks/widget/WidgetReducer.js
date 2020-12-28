import * as types from "./WidgetTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  crmSummary: {
    loading: false,
    data: {
      totalLeads: 0,
      totalOpenDeals: 0,
      openDealsAmount: 0,
      dealsWonAmount: 0
    }
  },
  untouchedLeads: { loading: false, data: [] },
  dealsByProduct: { loading: false, data: [] }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * CRM Summary
     */
    case types.GET_CRM_SUMMARY:
      return { ...state, crmSummary: { ...state.crmSummary, loading: true } };
    case types.GET_CRM_SUMMARY_SUCCESS:
      return {
        ...state,
        crmSummary: {
          ...state.crmSummary,
          loading: false,
          data: action.payload
        }
      };
    case types.GET_CRM_SUMMARY_FAILURE:
      return { ...state, crmSummary: { ...state.crmSummary, loading: false } };

    /**
     * Untouched Leads
     */
    case types.GET_UNTOUCHED_LEADS:
      return {
        ...state,
        untouchedLeads: { ...state.untouchedLeads, loading: true }
      };
    case types.GET_UNTOUCHED_LEADS_SUCCESS:
      return {
        ...state,
        untouchedLeads: {
          ...state.untouchedLeads,
          loading: false,
          data: action.payload
        }
      };
    case types.GET_UNTOUCHED_LEADS:
      return {
        ...state,
        untouchedLeads: { ...state.untouchedLeads, loading: false }
      };

    case types.GET_DEALS_BY_PRODUCT:
      return {
        ...state,
        dealsByProduct: { ...state.dealsByProduct, loading: true }
      }
    case types.GET_DEALS_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        dealsByProduct: { loading: false, data: action.payload }
      }
    case types.GET_DEALS_BY_PRODUCT_FAILURE: {
      NotificationManager.error("Failure to get deals chart data");
      return {
        ...state,
        dealsByProduct: {
          ...state.dealsByProduct,
          loading: false          
        }
      }
    }

    default:
      return { ...state };
  }
};
