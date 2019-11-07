import { NotificationManager } from "react-notifications";
import * as types from "./PaymentTypes";

const INIT_STATE = {
  paymentList: {
    dropdownOpen: false,
    nowShowing: "All Payment",
    options: ["All Payment", "My Payment", "Open Payment", "Closed Payment"],
    action: false,
    loading: false,
    tableData: [],
    companyList: null,
    invoicesList : [],
    fetchInvoice : false,
    fetchInvoiceList: [],
    fetchBalancePayment: []
  },
  paymentToView: { loading: false, payment: [] }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.PAYMENT_LIST_DROPDOWN:
      return {
        ...state,
      };
    
    case types.FETCH_ALL_PAYMENT:
          return {
            ...state,
            paymentList: {
              ...state.paymentList,
              loading: true,
            }
          };

    case types.FETCH_ALL_PAYMENT_FAILURE:
        return {
          ...state,
          paymentList: {
            ...state.paymentList,
            loading: false,
          }
        };

    case types.FETCH_ALL_PAYMENT_SUCCESS:
        return {
          ...state,
          paymentList: {
            ...state.paymentList,
            tableData: action.payload,
            loading: false,
          }
        };
        
    case types.MAKE_PAYMENT_INCOMPLETE_FAILURE:
      NotificationManager.error(`Please fill up the ${action.payload}`);
      return {
        ...state,
      };
      
    case types.MAKE_PAYMENT :
        return {
          ...state,
        };

    case types.MAKE_PAYMENT_SUCCESS:
        NotificationManager.success("Payment made successfully")
        setTimeout(() =>{
          window.location.reload();
        }, 250)
        return {
          ...state,
        };
    case types.MAKE_PAYMENT_FAILURE:
        NotificationManager.error("Unable to make payment, try again")
        return {
          ...state,
        };

    case types.GET_SINGLE_COMPANY_PAYMENT:
        return {
          ...state,
          paymentToView: {
            ...state.paymentToView,
            loading: true,
          }
        };

    case types.GET_SINGLE_COMPANY_PAYMENT_SUCCESS:
        return {
          ...state,
          paymentToView: {
            ...state.paymentToView,
            loading: false,
            payment : action.payload.company,
            company: action.payload.data
          }
        };

    case types.GET_SINGLE_COMPANY_PAYMENT_FAILURE:
        return {
          ...state,
          paymentToView: {
            ...state.paymentToView,
            loading: false,
          }
        };

    case types.FETCH_ALL_COMPANINES:
      return {
        ...state,
        paymentList: {
          ...state.paymentList,
          loading: true,
        },
      }

    case types.FETCH_ALL_COMPANINES_SUCCESS:
      return {
        ...state,
        paymentList: {
          ...state.paymentList,
          companyList: action.payload,
          loading: false
        },
      }

    case types.FETCH_ALL_COMPANINES_FAILURE:
        return {
          ...state,
          paymentList: {
            ...state.paymentList,
            loading: false
          },
        }   
      
    case types.FETCH_ALL_INVOICES_COMPANINES:
        return {
          ...state,
          paymentList: {
            ...state.paymentList,
            fetchInvoice : true
          },
        } 

    case types.FETCH_ALL_INVOICES_COMPANINES_SUCCESS:
          // return {getAllInvoicesPayment, checkingBalancePayment}
          
        return {
          ...state,
          paymentList: {
            ...state.paymentList,
            fetchInvoice : false,
            fetchInvoiceList : action.payload.getAllInvoicesPayment,
            fetchBalancePayment: action.payload.checkingBalancePayment
          },
        } 

    case types.FETCH_ALL_INVOICES_COMPANINES_FAILURE:
        return {
          ...state, 
          paymentList: {
            ...state.paymentList,
            fetchInvoice : false,
            fetchInvoiceList : []
          },       
        } 
        


        
    default:
      return { ...state };
  }
};
