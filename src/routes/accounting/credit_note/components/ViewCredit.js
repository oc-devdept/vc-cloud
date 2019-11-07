import React, { Component } from "react";
import Moment from "moment";

const paidOffOptions =  [{name:'Use as credit payment', value: false}, {name:'Paid off directly', value: true}]
const reconcileOptions =  [{name:'Keep Open', value: false}, {name:'Fully Reconcile', value: true}]

import AmountInput from "Components/Form/Inputs/AmountInput";
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";
import EditableInput from "Components/Profile/Details/EditableInput";


export default class ViewCredit extends Component {
 

  constructor(props) {
    super(props)   
  }

  state = {
    payment : this.props.state,
    // editable : this.props.state.paidOff ===  "" ? true : false
  };

  _handleChange = (a, b) => {
    let payment = this.state.payment
    payment[a] = b
    this.setState({ payment: payment });
  }

  render() {
   
    // const {customerName, paymentMethod, paidOff, reconciled, amount, paymentRef , memo, date} = this.props.state

    const {amount, createdAt, customer, customerName, id, memo, paymentMethod, paymentRef, reconciled  } = this.state.payment
     
    return (

      <div className="row">

        <div className="col-md-6" />

        <div className="col-md-6">
          <EditableInput label="Payment Date" value={Moment(this.state.date).format("LLL")} />
        </div>

        <div className="col-md-6">
        
          <EditableInput label="Company" value={customerName} />
 
          <EditableInput label="Payment Method" value={paymentMethod} />

        </div>

        <div className="col-md-6">
          
          <EditableInput label="Paid Amount" value={`$${amount}`} />

          <EditableInput label="Payment Refernece" value={paymentRef} />

        </div>

        <div className="col-md-12">
            <EditableInput label="Memo" value={memo} />
        </div>

    
        {/* <div className="col-md-12">  

            {this.state.editable &&
              <div>
                {paidOff !== "" &&
                    <FormInput
                        label="Paid Off"
                        value={paidOff}
                        selectValues={paidOffOptions}
                        target="paidOff"
                        handleChange={this._handleChange}
                    />  
                }

                {paidOff === "" &&
                    <FormInput
                        label="Paid Off"
                        value={paidOff}
                        required={true}
                        selectValues={paidOffOptions}
                        target="paidOff"
                        handleChange={this._handleChange}
                    />  
                }
              </div>
            }

            {!this.state.editable &&
              <EditableInput label="Paid Off" value={paidOff?  "Paid off directly" : "Use as credit payment"} />
            }
           
        </div> */}

    
        <div className="col-md-12">  
          {reconciled && 
            <EditableInput label="Reconciled" value={"Fully Reconcile"} />
          }
        </div>
    

        {/* {this.state.editable &&
          <div className="col-md-12 d-flex justify-content-end" onClick={() => this.props.preparePayment(this.state.payment)}>
            <span style={{
              display: 'flex', justifyContent:'center',
              alignItems:'center', height: 40, width: 80,
              borderRadius: 5, border: '1px solid black'
            }}>save</span>
          </div>
        } */}

        

      </div>
    );
  }
}
