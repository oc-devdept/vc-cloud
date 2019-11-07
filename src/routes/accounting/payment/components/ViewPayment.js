import React, { Component } from "react";
import Moment from "moment";

const paymentOption = [
  { name: "Paypal", value: "Paypal" },
  { name: "Stripe", value: "Stripe" },
  { name: "Bank FAST", value: "Bank FAST" }
];
const paymentDifferenceOptions = [
  { name: "Keep Open", value: "Keep Open" },
  { name: "Fully Reconcile", value: "Fully Reconcile" }
];

import AmountInput from "Components/Form/Inputs/AmountInput";
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

import EditableInput from "Components/Profile/Details/EditableInput";


export default class ViewPayment extends Component {
  // constructor(props) {
  //     super(props)
  // }

  state = {
    customer: this.props.invoice.customerName,
    invoiceId: this.props.invoice.id,
    paidAmount: this.props.invoice.amount,
    paymentMethod: this.props.invoice.paymentMethod,
    date: new Date(this.props.invoice.createdAt),
    paymentRef: this.props.invoice.paymentRef,
    memo: this.props.invoice.memo,
    paymentDifference: this.props.invoice.paymentDifference
  };

  handleChange = (a, b) => {
    this.setState({ [a]: b });

    // if all items are filled, send to parent
    // this.props.preparePayment()
  };

  render() {
    const { invoice } = this.props;


    return (
      <div className="row">
        <div className="col-md-6" />
        
        <div className="col-md-6">
       
          <EditableInput label="Payment Date" value={Moment(this.state.date).format("LLL")} />

        </div>

        <div className="col-md-6">

          <EditableInput label="Company" value={this.state.customer} />
         
          <EditableInput label="Payment Method" value={this.state.paymentMethod} />

        </div>

        <div className="col-md-6">
     
          <EditableInput label="Paid Amount" value={`$${this.state.paidAmount}`} />

          <EditableInput label="Payment Reference" value={this.state.paymentRef} />
       
        </div>

        <div className="col-md-12">
          <EditableInput label="Memo" value={this.state.memo} />
        </div>

      </div>
    );
  }
}
