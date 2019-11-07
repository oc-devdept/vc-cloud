import { NotificationManager } from "react-notifications";

import * as types from "./QuotationTypes";


const INIT_STATE = {
  quotationList: {
    dropdownOpen: false,
    nowShowing: "All Quotations",
    options: [
      "All Quotations",
      "My Quotations",
      "Open Quotations",
      "Closed Quotations"
    ],
    action: false,
    loading: false,
    deleted: false,
    tableData: [],
    currencyTable:[{name: 'SGD', value: 1},{name: 'USD', value: 1.3},{name: 'EU', value: 1.5}],
    discountTable:[{name: 'Entry', value: 0}, {name: 'Amateur', value: 10},{name: 'Intermediate', value: 15},{name: 'Pro', value: 20}],
    taxTable:[{name: 'GST 7%', value: 7},{name: 'GST Inclusive', value: 0}],
    accountsList : [],
    owner:[],
    complete: false,
    uploaded: false,
  },
  quotationSummary: {
    showSummary: false,
    loading: false,
    summary: []
  },
  quotationToView: { loading: false, quotation: null},
  quotationForm: {
    loading: false,
    attn_to_array: [],
    quotation: {
      date: new Date(),
      currency: "",
      currency_rate: "",

      version: "",
      subtotal: 0,
      tax_amount: 0,
      discount_total: 0,
      totalAmt: 0,

      discount: "",
      discount_rate: 0,

      description: "",
      owner: "",
      accountId:"",
      attn_toId:"",
      details: '',
      address_1:"",
      address_2:"",
      city: "",
      state: "",
      zip: "",
      sent_date: "",
      tnc: "",
    
      quoteID: "",
      account: null,
      state: "Draft",
      sentOn: new Date(),
      dueDate: new Date(),
    },
    products: [
      {
        // name: "",
        description: "",
        quantity: 0,
        price: 0,
        discount: 0,
        tax_id:"",
        tax_rate: 0,
        tax_amount: 0,
        amount: 0
      }
    ]
  }
};




export default (state = INIT_STATE, action) => {

  function getSubTotal(array, key) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  }

  function getSingleProductTotal(product) {
    var subtotal = product.price * product.quantity;
    var tax = (product.tax_id.rate / 100) * subtotal;
    // var discount = (product.discount / 100) * subtotal;
    var total = subtotal + tax - product.discount;

    if(total<0) {
      total = 0
    }
    return total;
  }


  function getTotal(subTotal, discount) {
 
    var total = (subTotal) * (1-(discount/100));
  
    return total;

  }

  function getTax (product) {
    // let subTotal = 0
    let totalTax = 0
    // let total = 0
    if (product.length > 0) {
      product.forEach(element =>{
        totalTax = totalTax + element.tax_amount
      })
      return totalTax
    }
  }


  switch (action.type) {
    case types.QUOTATION_LIST_DROPDOWN:
      return {
        ...state,
        quotationList: {
          ...state.quotationList,
          dropdownOpen: !state.quotationList.dropdownOpen
        }
      };
    case types.CHANGE_QUOTATION_LIST_VIEW:
      if (action.payload == "My Quotations") {
        return {
          ...state,
          quotationList: {
            ...state.quotationList,
            nowShowing: action.payload,
            action: true,
            loading: true
          }
        };
      } else {
        return {
          ...state,
          quotationList: {
            ...state.quotationList,
            nowShowing: action.payload,
            action: false,
            loading: true
          }
        };
      }

    /**
     * Quotation Summary
     */
    case types.TOGGLE_QUOTATION_SUMMARY:
      return {
        ...state,
        quotationSummary: {
          ...state.quotationSummary,
          showSummary: !state.quotationSummary.showSummary
        }
      };
    case types.GET_QUOTE_SUMMARY:
      return {
        ...state,
        quotationSummary: {
          ...state.quotationSummary,
          loading: true
        }
      };
    case types.GET_QUOTE_SUMMARY_SUCCESS:
      return {
        ...state,
        quotationSummary: {
          ...state.quotationSummary,
          summary: action.payload,
          loading: false
        }
      };
    case types.GET_QUOTE_SUMMARY_FAILURE:
      NotificationManager.warning("Error in fetching Quotation Summary");
      return { ...state, quotationSummary: INIT_STATE.quotationSummary };

    /**
     * Get Quotes
     */
    case types.GET_QUOTATION_FAILURE:
      NotificationManager.warning("Error in fetching Quotation Data");
      return INIT_STATE;
    case types.GET_ALL_QUOTATION:
    case types.GET_MY_QUOTATION:
    case types.GET_OPEN_QUOTATION:
    case types.GET_CLOSED_QUOTATION:
      return {
        ...state,
        quotationList: { ...state.quotationList, loading: true }
      };
    case types.GET_QUOTATION_SUCCESS:
      return {
        ...state,
        quotationList: {
          ...state.quotationList,
          loading: false,
          tableData: action.payload
        }
      };

    /**
     * Get Single Quotation
     */
    case types.GET_SINGLE_QUOTATION:
      return {
        ...state,
        quotationToView: { ...state.quotationToView, loading: true }
      };
     
      
    case types.GET_SINGLE_QUOTATION_SUCCESS:
      return {
        ...state,
        quotationToView: {
          ...state.quotationToView,
          loading: false,
          quotation: action.payload
        },
        quotationForm: {
          ...state.quotationForm,
          products: action.payload.quotationline,
          quotation: action.payload
        }
      };

    case types.CLEAR_SINGLE_QUOTATION:
      let initialItem = INIT_STATE.quotationForm.quotation
      return {
        ...state,
        quotationList:{
          ...state.quotationList,
          deleted: false
        },
        quotationToView: INIT_STATE.quotationToView,
        quotationForm: {
          quotation : initialItem,
          products: [
            {
              description: "",
              quantity: "",
              price: "",
              discount: "",
              tax_id:"",
              tax_rate: 0,
              tax_amount: 0,
              amount: 0
            }
          ]
        }
      };

    /**
     * New Quote
     */
    case types.SUBMIT_QUOTATION:
      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          loading: true
        }
      };
      
    case types.CLEAR_QUOTATION_FORM:
      return {
        ...state,
        quotationForm: INIT_STATE.quotationForm,
      };

    /**
     * Quotation Product
     */
    case types.ADD_NEW_PRODUCT_QUOTATION:
      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          products: [
            ...state.quotationForm.products,
            {
              name: "",
              description: "",
              quantity: "",
              price: "",
              discount: "",
              tax_id:"",
              tax_rate:"",
              tax_amount: "",
              amount: 0
            }
          ]
        }
      };

    case types.REMOVE_PRODUCT_QUOTATION:
      var arr = Object.assign([], state.quotationForm.products);
      var removeArr = [
        ...arr.slice(0, action.payload),
        ...arr.slice(action.payload + 1)
      ];

      var productTotal = getSubTotal(removeArr, "amount");
      var tax = getTax(removeArr)
      
      let totalAmt = 0
      removeArr.forEach(item =>{
        totalAmt = totalAmt + getSingleProductTotal(item);
      })
     

      if(removeArr.length == 0){
        removeArr = [{
          // name: "",
          description: "",
          quantity: 0,
          price: 0,
          discount: 0,
          tax_id:"",
          tax_rate: 0,
          tax_amount: 0,
          amount: 0
        }]
        tax = 0
        totalAmt = 0
        productTotal = 0
      }

      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          products: removeArr,
          quotation: {
            ...state.quotationForm.quotation,
            subtotal: productTotal - tax,
            totalAmt: totalAmt + tax,
            tax_amount: tax
          }
        }
      };



      case types.HANDLE_PRODUCT_QUOTATION:

        var changeArr = state.quotationForm.products;
    
        // check if Tax_Id has changed
      

        changeArr[action.payload.key] = {
          ...changeArr[action.payload.key],
          [action.payload.field]: action.payload.value
        }
       
        if (action.payload.field == "tax_id"){
          changeArr[action.payload.key] = {
            ...changeArr[action.payload.key],
            tax_rate : action.payload.value.rate,
          }
        }



        // update single product amount
        changeArr[action.payload.key].amount = getSingleProductTotal(changeArr[action.payload.key]);

        var productTotal = getSubTotal(changeArr, "amount");
        var tax = getTax(changeArr)

        if (changeArr[action.payload.key].tax_rate != 0){
          changeArr[action.payload.key].tax_amount = (((changeArr[action.payload.key].tax_rate)/100) * (changeArr[action.payload.key].price * changeArr[action.payload.key].quantity))        
          tax = getTax(changeArr)
        } 
        
        // else {
        //   changeArr[action.payload.key].tax_amount = 0
        // }

            
        // var totalAmtInvoice = 0
        // changeArr.forEach(item =>{
        //  var productSubTotal = (item.price * item.quantity)
        //  var productSubTax = item.tax_rate * productSubTotal
        //  var productTotal = productSubTotal + productSubTax - item.discount
        //  totalAmtInvoice = totalAmtInvoice + productTotal
        // })



        return {
          ...state,
          quotationForm: {
            ...state.quotationForm,
            products: changeArr,
            quotation: {
              ...state.quotationForm.quotation,
              subtotal: productTotal - tax,
              totalAmt: getTotal(productTotal, state.quotationForm.quotation.discount_rate),
              tax_amount: tax
            }
          }
        };
  
    /**
     * Handle Change
     */
    case types.HANDLE_CHANGE_QUOTATION:

     
      var changeArr = state.quotationForm.products;
      var productTotal = getSubTotal(changeArr, "amount");
      var tax = getTax(changeArr)

      // auto fill for address, ctiy, state, zip, mobile, office, fax
      if(action.payload.field == "accountId") {

        return {
          ...state,
          quotationForm: {
            ...state.quotationForm,
            attn_to_array: action.payload.value.customers,
            quotation: {
              ...state.quotationForm.quotation,
              [action.payload.field]: action.payload.value,

              details: action.payload.value.baseContact._address.address_1 + `\n` + action.payload.value.baseContact._address.address_1 + `\n` + action.payload.value.baseContact._address.city + `\n` + action.payload.value.baseContact._address.zip,
            
            }
          }
        };
      }

      // autofill for email
      if(action.payload.field == "attn_toId") {
        return {
          ...state,
          quotationForm: {
            ...state.quotationForm,
            quotation: {
              ...state.quotationForm.quotation,
              [action.payload.field]: action.payload.value,
              // email:action.payload.value.baseContact.email,
            }
          }
        };
      }

      if(action.payload.field == "currency") {
        return {
          ...state,
          quotationForm: {
            ...state.quotationForm,
            quotation: {
              ...state.quotationForm.quotation,
              currency: action.payload.value,
              currency_rate: action.payload.value.rate
            }
          }
        };
      }


      if(action.payload.field == "discount") {
        
        // productTotal = getSubTotal(changeArr, "amount");
        // tax = getTax(changeArr)


        return {
          ...state,
          quotationForm: {
            ...state.quotationForm,
            quotation: {
              ...state.quotationForm.quotation,
              discount: action.payload.value,
              discount_rate: action.payload.value.rate,

              // subtotal: productTotal,
              // tax_amount: tax,

              totalAmt: getTotal(productTotal, action.payload.value.rate),
            }
          }
        };
      }

   
      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          quotation: {
            ...state.quotationForm.quotation,
            [action.payload.field]: action.payload.value,
            subtotal: productTotal,
            tax_amount: tax
          }
        }
      };


    case types.SUBMIT_QUOTATION_SUCCESS:
      NotificationManager.success("Your form has been successfully updated")

      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          quotation: {
            ...state.quotationForm.quotation,
          }
        }
      };

      

    case types.SUBMIT_QUOTATION_FAILURE:
      NotificationManager.warning("Unable to submit quotation, please try again")

      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          quotation: {
            ...state.quotationForm.quotation,
          }
        }
      };

    case types.DELETE_QUOTATION:
      // console.log(action.payload)
      // NotificationManager.warning("Unable to submit quotation, please try again")
      return {
        ...state,
        quotationList: {
          ...state.quotationList,
        }
        
      };

    case types.DELETE_QUOTATION_SUCCESS:
      // console.log(action.payload)
      NotificationManager.success("Quotation successfully deleted")
      return {
        ...state,
        quotationList: {
          ...state.quotationList,
          deleted: true
        },
        quotationForm: {
          quotation : INIT_STATE.quotationForm.quotation,
          products: [
            {
              description: "",
              quantity: "",
              price: "",
              discount: "",
              tax_id:"",
              tax_rate: 0,
              tax_amount: 0,
              amount: 0
            }
          ]
        }
      };

    case types.DELETE_QUOTATION_FAILURE:
      NotificationManager.error(action.payload)
      return {
        ...state,
        quotationList: {
          ...state.quotationList,
        }
      };



    case types.HANDLE_RELATED_TO_QUOTATION:
    return

    case types.HANDLE_ATTN_TO_QUOTATION:
      var attnTo = action.payload.value;
      return {
        ...state,
        quotationForm: {
          ...state.quotationForm,
          quotation: {
            ...state.quotationForm.quotation,
            attn_to: attnTo.id,
            address1: attnTo.address1,
            address2: attnTo.address2,
            city: attnTo.city,
            state: attnTo.state,
            zip: attnTo.zip,
            email: attnTo.email,
            phone: attnTo.mobile
          }
        }
      };

          /**
     * Notes
     */
    case types.ADD_NOTE_QUOTATION:
      return {
        ...state,
        quotationToView: { ...state.quotationToView, sectionLoading: true }
      };
    case types.ADD_NOTE_QUOTATION_SUCCESS:
      var newNotes = Object.assign([], state.quotationToView.quotation.notes);
      newNotes.unshift(action.payload);
      return {
        ...state,
        quotationToView: {
          ...state.quotationToView,
          quotation: { ...state.quotationToView.quotation, notes: newNotes },
          sectionLoading: false
        }
      };
    case types.ADD_NOTE_QUOTATION_FAILURE:
      NotificationManager.error("Error in adding Note");
      return {
        ...state,
        quotationToView: { ...state.quotationToView, sectionLoading: false }
      };

    
    case types.HANDLE_STATE_UPDATE:
        return {
          ...state,
          quotationToView: { ...state.quotationToView, loading: true }
        };
    
    case types.HANDLE_STATE_UPDATE_SUCCESS:

        NotificationManager.success("Quotation has been converted successfully");

        return {
          ...state,
          quotationToView: { quotation: action.payload, loading: false }
        };

    case types.HANDLE_STATE_UPDATE_FAILURE:
        NotificationManager.error("Unable to handle request, please try again");
        return {
          ...state,
          quotationToView: { ...state.quotationToView, loading: false }
        };

    case types.HANDLE_QUOTATION_ACCOUNTS:
        // console.log('HANDLE_QUOTATION_ACCOUNTS')
        return {
          ...state,
          quotationList :{
            ...state.quotationList,
          }          
        };

    case types.HANDLE_QUOTATION_ACCOUNTS_SUCCESS:
      // console.log('HANDLE_QUOTATION_ACCOUNTS_SUCCESS')

      return {
          ...state,
          quotationList :{
            ...state.quotationList,
            accountsList : action.payload.fields[0],
            owner: action.payload.fields[1]
          }  
        };

    case types.HANDLE_QUOTATION_ACCOUNTS_FAILTURE:
        return {
          ...state,
          quotationList :{
            ...state.quotationList,
            accountsList : []
          }  
        };

    case types.SUBMIT_NEW_QUOTATION:
        return {
          ...state,
          quotationList :{
            ...state.quotationList,
            uploaded: false,
          }  
        };

    case types.SUBMIT_NEW_QUOTATION_SUCCESS:
        NotificationManager.success("Quotation form saved succesfully")
        return {
          ...state,
          quotationList :{
            ...state.quotationList,
            uploaded: true,
          }  
        };


    case types.SUBMIT_NEW_QUOTATION_FAILURE:
        NotificationManager.error("Unable to create new quotation form")
        return {
          ...state,
          quotationList :{
            ...state.quotationList,
            uploaded: false,
          }  
        };

    case types.RESTART_QUOTATION_UPLOAD_STATUS:
          return {
            ...state,
            quotationList :{
              ...state.quotationList,
              uploaded: false,
            }  
          };
        
        
    default:
      return { ...state };
  }
};
