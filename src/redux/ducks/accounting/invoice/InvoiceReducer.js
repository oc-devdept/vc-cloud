import { NotificationManager } from "react-notifications";
import * as types from "./InvoiceTypes";

const INIT_STATE = {
  invoiceList: {
    dropdownOpen: false,
    nowShowing: "All Invoices",
    options: [
      "All Invoices",
      "My Invoices",
      "Open Invoices",
      "Closed Invoices"
    ],
    action: false,
    loading: false,
    deleted: false,
    tableData: [],
    uploaded: false,
  },
  invoiceSummary: {
    showSummary: false,
    loading: false,
    summary: []
  },
  invoiceToView: { loading: false, invoice: null, payment: null, amount: null }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.INVOICE_LIST_DROPDOWN:
      return {
        ...state,
        invoiceList: {
          ...state.invoiceList,
          dropdownOpen: !state.invoiceList.dropdownOpen
        }
      };
    case types.CHANGE_INVOICE_LIST_VIEW:
      if (action.payload == "My Invoices") {
        return {
          ...state,
          invoiceList: {
            ...state.invoiceList,
            nowShowing: action.payload,
            action: true,
            loading: true
          }
        };
      } else {
        return {
          ...state,
          invoiceList: {
            ...state.invoiceList,
            nowShowing: action.payload,
            action: false,
            loading: true
          }
        };
      }

    /**
     * Invoice Summary
     */
    case types.TOGGLE_INVOICE_SUMMARY:
      return {
        ...state,
        invoiceSummary: {
          ...state.invoiceSummary,
          showSummary: !state.invoiceSummary.showSummary
        }
      };
    case types.GET_INVOICE_SUMMARY:
      return {
        ...state,
        invoiceSummary: {
          ...state.invoiceSummary,
          loading: true
        }
      };
    case types.GET_INVOICE_SUMMARY_SUCCESS:
      return {
        ...state,
        invoiceSummary: {
          ...state.invoiceSummary,
          summary: action.payload,
          loading: false
        }
      };
    case types.GET_INVOICE_SUMMARY_FAILURE:
      NotificationManager.warning("Error in fetching Invoice Summary");
      return { ...state, invoiceSummary: INIT_STATE.invoiceSummary };

    /**
     * Get Quotes
     */
    case types.GET_INVOICE_FAILURE:
      NotificationManager.warning("Error in fetching Invoice Data");
      return INIT_STATE;
    case types.GET_ALL_INVOICE:
    case types.GET_MY_INVOICE:
    case types.GET_OPEN_INVOICE:
    case types.GET_CLOSED_INVOICE:
      return {
        ...state,
        invoiceList: { ...state.invoiceList, loading: true }
      };
    case types.GET_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceList: {
          ...state.invoiceList,
          loading: false,
          tableData: action.payload
        }
      };

    /**
     * Get Single Invoice
     */
    case types.GET_SINGLE_INVOICE:
      return {
        ...state,
        invoiceToView: { ...state.invoiceToView, loading: true }
      };

    case types.GET_SINGLE_INVOICE_SUCCESS:

      return {
        ...state,
        invoiceToView: {
          ...state.invoiceToView,
          loading: false,
          invoice: action.payload.InvoiceSource,
          payment: action.payload.ReconcileSource,
          amount: action.payload.ReconcileAmount
        }
      };

    case types.CLEAR_SINGLE_INVOICE:
      return {
        ...state,
        invoiceList: {
          ...state.invoiceList,
          deleted: false
        },
        invoiceToView: { loading: false, invoice: null, payment: null, amount: null }            
      };

      case types.SUBMIT_INVOICE_SUCCESS:
          NotificationManager.success("Invoice form saved successfully")
    
          return {
            ...state,
            invoiceToView: {
              ...state.invoiceToView,
              loading: false,
              invoice: action.payload
            }

          };
    
    
        case types.SUBMIT_INVOICE_FAILURE:
          NotificationManager.warning("Unable to submit quotation, please try again")
    
          return {
            ...state,
            invoiceToView: {
              ...state.invoiceToView,
              loading: false,
            }
          };
    

    case types.DELETE_INVOICE:
      // console.log(action.payload)
      // NotificationManager.warning("Unable to , please try again")
      return {
        ...state
      };

    case types.DELETE_INVOICE_SUCCESS:

      NotificationManager.success("Invoice successfully deleted")
      return {
        ...state,
        invoiceList: {
          ...state.invoiceList,
          deleted: true
        },
        invoiceToView: { loading: false, invoice: null },
      };
      
    
    case types.DELETE_INVOICE_FAILURE:
      NotificationManager.error(action.payload)
      return {
        ...state,
        invoiceList: {
          ...state.invoiceList,
        }
      };

    case types.INVOICE_HANDLE_STATE_UPDATE:
      return {
        ...state,
        invoiceToView: { ...state.invoiceToView, loading: true }
      };

    case types.INVOICE_HANDLE_STATE_UPDATE_SUCCESS:
      NotificationManager.success('Invoice state successfully confirmed')
      return {
        ...state,
        invoiceToView: { invoice: action.payload, loading: false }
      };

    case types.INVOICE_HANDLE_STATE_UPDATE_FAILURE:
      NotificationManager.error('Unable to convert the invoice')
      return {
        ...state,
        invoiceToView: { ...state.invoiceToView, loading: false }
      };

    case types.SUBMIT_NEW_INVOICE:
          return {
            ...state,
            invoiceList: {
              ...state.invoiceList,
              uploaded: false
            },
          };
  
    case types.SUBMIT_NEW_INVOICE_SUCCESS:
        NotificationManager.success("Invoice form saved succesfully")
          return {
            ...state,
            invoiceList: {
              ...state.invoiceList,
              uploaded: true
            },
            
          };
  
    case types.SUBMIT_NEW_INVOICE_FAILURE:
          return {
            ...state, 
            invoiceList: {
              ...state.invoiceList,
              uploaded: false
            },
          };
  
    case types.RESTART_UPLOAD_STATUS:

        return {
          ...state, 
          invoiceList: {
            ...state.invoiceList,
            uploaded: false
          },
        };
      


    default:
      return { ...state };
  }
};
