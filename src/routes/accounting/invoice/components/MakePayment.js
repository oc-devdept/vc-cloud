import React, {Component} from 'react'

import Button from "@material-ui/core/Button";

const paymentOption =  [{name:'Paypal', value: 'Paypal'}, {name:'Stripe', value: 'Stripe'}, {name:'Bank FAST', value: 'Bank FAST'}]
const paymentDifferenceOptions =  [{name:'Keep Open', value: false}, {name:'Fully Reconcile', value: true}]

import AmountInput from "Components/Form/Inputs/AmountInput";
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";
import AppConfig from 'Constants/AppConfig'
import Checkbox from '@material-ui/core/Checkbox';
import EditableInput from "Components/Profile/Details/EditableInput";


export default class MakePayment extends Component {
    

    state=({
        
        singlePayment:{
            customer: this.props.invoice.accountId.value,
            customerName: this.props.invoice.accountId.name,
            invoiceId: this.props.invoice.id,
            invoiceQuote: this.props.invoice.quoteID,
            reconcileInvoice: false,

            amount : 0,
            paymentMethod: '',
            date: new Date(),
            paymentRef: "",
            memo : '',
            paymentDifference: '',
            userId : localStorage.getItem('user_id'),
        },
        
    })

    handleChange = (a, b) => {

        if(a == "amount") {

            let singlePayment = {...this.state.singlePayment}
            const {reconciledAmount} = this.props

            if(b >= reconciledAmount) {
                singlePayment.amount = reconciledAmount
                singlePayment.reconcileInvoice = true
            } else {
                singlePayment.amount = b
                singlePayment.reconcileInvoice = false
            }

            this.setState({singlePayment: singlePayment})

        } else {

            let singlePayment = {...this.state.singlePayment}
            singlePayment[a] = b

            this.setState({singlePayment: singlePayment})

        }
        
    }

    _handleSubmitPayment = () => {
        this.props.makePayment(this.state.singlePayment)
    }

    
    render(){

        const {invoice, reconciledAmount} = this.props
    
        const {
            amount,
            paymentMethod,
            date,
            paymentRef,
            memo,
            paymentDifference,
            reconcileInvoice
        }  = this.state.singlePayment

        return(
            <div>

                <div className="row">
                    <div className="col-md-6">
                        <EditableInput label="Company" value={invoice.accountId.name} />
                    </div>
                    <div className="col-md-6">
                        <EditableInput label="Amount Left" value={`$${reconciledAmount}`} />
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">

                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                       
                            <AmountInput
                                label="Amount"
                                value={amount}
                                required={!amount}
                                target='amount'
                                onChange={e => {
                                    this.handleChange("amount", e.target.value)
                                }}
                            />
                   
                        </div>
                    
                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            
                            <FormInput
                                label="Payment Method"
                                value={paymentMethod}
                                required={!paymentMethod}
                                selectValues={paymentOption}
                                target="paymentMethod"
                                handleChange={this.handleChange}
                            />  

                        </div>

                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            
                            <FormInput
                                label="Payment Difference"
                                value={paymentDifference}
                                // required={!paymentDifference}
                                selectValues={paymentDifferenceOptions}
                                target="paymentDifference"
                                handleChange={this.handleChange}
                            />   

                        </div>

                    </div>

                    <div  className="col-md-6">

                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            {/* <div style={{paddingRight: 10}}>Date: </div>
                            <KeyboardDatePicker
                                margin="normal"
                                style={{marginTop:0}}
                                // id="mui-pickers-date"
                                value={Moment(this.state.date).format('LLL')}
                                onChange={e => this.handleChange('date', e._d)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> */}
                            <DatePickerInput
                                label="Date"
                                value={date}
                            />
                        </div>
                    
                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                            {/* <div style={{paddingRight: 10}}>Payment Ref: </div>
                            <FormTextField
                                placeholder={"e.g. 003/10"}
                                value={this.state.paymentRef}
                                handleChange={this.handleChange}
                                target={'paymentRef'}
                                //targetType={targetType}
                            /> */}
                            <FormInput
                                label="Payment Ref"
                                placeholder={"e.g. 003/10"}
                                value={paymentRef}
                                required={!paymentRef}
                                target="paymentRef"
                                handleChange={this.handleChange}
                            />  
                        </div>

                        <div style={{marginTop: 15, display:'flex', flexDirection:'row', alignItems:'center'}}>
                           
                            <FormInput
                                label="Memo"
                                placeholder={"Enter message.."}
                                value={memo}
                                target="memo"
                                handleChange={this.handleChange}
                            />  
                        </div>

                    </div>

                    <div style={{marginLeft: 10,  marginTop: 5}}>
                        <span style={{color: 'rgba(0, 0, 0, 0.54)'}}>Reconciled</span>
                        
                        <Checkbox
                            checked={reconcileInvoice}
                            color="primary"
                            style={{color: AppConfig.themeColors.primary}}
                            onChange={event => {
                                this.handleChange('reconcileInvoice', event.target.checked)
                            }}
                        />
                        
                    </div>

                    <div style={{marginTop: 25, marginBottom: 25}} className="col-md-12">
                        <Button
                            variant="contained"
                            color="primary"
                            className="text-white"
                            onClick={this._handleSubmitPayment}
                        >
                            Make Payment
                        </Button>
                    </div>
                
                </div>
            </div>
        )
    }


}