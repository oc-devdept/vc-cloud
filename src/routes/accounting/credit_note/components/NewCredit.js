import React, {PureComponent} from 'react'
import { Form, FormGroup, Label, Col } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Moment from 'moment'

const paymentOption =  [{name:'Paypal', value: 'Paypal'}, {name:'Stripe', value: 'Stripe'}, {name:'Bank FAST', value: 'Bank FAST'}]
const paidOffOptions =  [{name:'Use as credit payment', value: false}, {name:'Paid off directly', value: true}]
const reconcileOptions =  [{name:'Keep Open', value: false}, {name:'Fully Reconcile', value: true}]


const creditOptions =  [
    {name:'To Company', value: 1},
    {name:'To Invoice', value: 2},
    // {name:'To Balance Payment', value: 3},
]


import AmountInput from "Components/Form/Inputs/AmountInput";
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";


export default class NewCredit extends PureComponent {
    
    constructor(props) {
        super(props)   
        this.companyList = this.props.companyList
    }



    handleChange = (a, b) => {

        if(a == "customerName"){
            const filterItem = this.props.companyList.filter(e => {
                if(e.value == b){
                    return e
                }
            })
            this.props._renderAllInvoicesForOneCompany(filterItem[0])
            return this.props.onSetState(a, b, filterItem[0])
        }

        this.props.onSetState(a, b)
    }
  

    render(){

        const {customerName, paymentMethod, paidOff, reconciled, amount, paymentRef , memo, date} = this.props.state
        const invoiceList = this.props.invoiceList
        const balanceLength = this.props.balanceLength
        const invoiceLength = this.props.invoiceLength
        const rowIndex = this.props.rowIndex

        let container = null
        let paidOffContainer = null

        if(customerName){
            container = (
                <div className="col-md-12">        
                    <div className="row">

                        <div className="col-md-6">

                            <FormInput
                                label="Payment Method"
                                value={paymentMethod}
                                required={!paymentMethod}
                                selectValues={paymentOption}
                                target="paymentMethod"
                                handleChange={this.handleChange}
                            />                
                    
                        
                            <FormInput
                                label="Payment Ref"
                                value={paymentRef}
                                placeholder={"e.g. 003/10"}
                                required={!paymentRef}
                                target='paymentRef'
                                handleChange={this.handleChange}
                            />

                        </div>


                        <div className="col-md-6">

                            <AmountInput
                                label="Amount"
                                value={amount}
                                required={!amount}
                                target='amount'
                                onChange={e => {
                                    this.handleChange("amount", e.target.value)
                                }}
                            />


                            <FormInput
                                label="Memo"
                                value={memo}
                                target="memo"
                                handleChange={this.handleChange}
                            />
                            
                        </div>

                    </div>
                </div>
            )
        }

        // if(rowIndex !== ""){
        //     paidOffContainer = (
        //         <div className="col-md-12">  
        //             {paidOff !== "" &&
        //                 <FormInput
        //                     label="Paid Off"
        //                     value={paidOff}
        //                     selectValues={paidOffOptions}
        //                     target="paidOff"
        //                     handleChange={this.handleChange}
        //                 />  
        //             }
        //             {paidOff === "" &&
        //                 <FormInput
        //                     label="Paid Off"
        //                     value={paidOff}
        //                     required={true}
        //                     selectValues={paidOffOptions}
        //                     target="paidOff"
        //                     handleChange={this.handleChange}
        //                 />  
        //             }
        //         </div>
        //     )
        // }
        // // Invoice
        // if (rowIndex == 2){
        //     if(invoiceLength == 0){
        //         container = null
        //         paidOffContainer = null
        //     }
        // }
        // // Balance
        // if (rowIndex == 3){
        //     if(balanceLength == 0){
        //         container = null
        //     }
        //     paidOffContainer = null
        // }

        // paidOffContainer = null


        return(
        
            <div className="row">
                
                <div className="col-md-6">

                    <FormInput
                        label="Company"
                        value={customerName}
                        selectValues={this.props.companyList}
                        target="customerName"
                        handleChange={this.handleChange}
                    /> 

                </div>
                
                <div className="col-md-6">  
                    <DatePickerInput
                        label="Payment Date"
                        value={Moment(date).format('LLL')}
                        required={!date}
                        onChange={date =>
                            this.handleChange('date', e._d)
                        }
                    />
                </div>
                


                {/* {invoiceList &&
                    <div className="col-md-12">  
                        <FormInput
                            label="Credit Options"
                            value={rowIndex}
                            selectValues={creditOptions}
                            target="creditOption"
                            handleChange={this.handleChange}
                        /> 
                    </div>
                } */}
                
                {container}

                {/* {paidOffContainer} */}

                {/* {rowIndex !== "" && balanceLength !== 0 || invoiceLength !== 0 &&
                    <div className="col-md-12">  

                        {paidOff !== "" &&
                            <FormInput
                                label="Paid Off"
                                value={paidOff}
                                selectValues={paidOffOptions}
                                target="paidOff"
                                handleChange={this.handleChange}
                            />  
                        }

                        {paidOff === "" &&
                            <FormInput
                                label="Paid Off"
                                value={paidOff}
                                required={true}
                                selectValues={paidOffOptions}
                                target="paidOff"
                                handleChange={this.handleChange}
                            />  
                        }
                    </div>
                }  */}


                {rowIndex != 3 && paidOff === false &&

                    <div className="col-md-12">  

                        {reconciled !== "" &&
                            <FormInput
                                label="Reconciled"
                                value={reconciled}
                                selectValues={reconcileOptions}
                                target="reconciled"
                                handleChange={this.handleChange}
                            />  
                        }

                        
                        {reconciled === "" &&
                            <FormInput
                                label="Reconciled"
                                value={reconciled}
                                required={!reconciled}
                                selectValues={reconcileOptions}
                                target="reconciled"
                                handleChange={this.handleChange}
                            />  
                        }

                    </div>
                }

            </div>
          
        )
    }


}