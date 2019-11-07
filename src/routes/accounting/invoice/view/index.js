import React, { Component } from "react";
import { connect } from "react-redux";

// // Global Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Redirect } from "react-router";

//buttons
import MatButton from "@material-ui/core/Button";

// Components
import RctPageLoader from "Components/RctPageLoader";
import MakePayment from "../components/MakePayment";


import DialogRoot from "Components/Dialog/DialogRoot";
import PageErrorMessage from "Components/Error/PageErrorMessage";


// Actions
import { newInvoice, invoiceEditPage, invoiceNewPage } from "Helpers/accountingURL";

import { 
  getSingleInvoice, 
  clearSingleInvoice, 
  deleteSingleInvoice, 
  InvoiceHandleStateUpdate, 
  InvoiceHandleStateCreateNewVersion, 
  InvoiceHandleStateRevertPreviousVersion, 
} from "Ducks/accounting/invoice";

import {
  makePayment, 
  makePaymentIncompleteFields
} from 'Ducks/accounting/payment';

import InvoiceCard from "../components/InvoiceCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
import OverviewTab from "./tabs/Overview";



class acct_view_invoice extends Component {

  state = {
    makePayment: false
  };

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleInvoice(id);
  }

  componentWillMount() {
    this.props.clearSingleInvoice();
  }

  addNote = invoice => {
    this.props.addNoteQuotation(this.props.match.params.id, invoice);
  };

  newInvoice() {
    this.props.history.push(invoiceNewPage)
  }

  edit(invoice) {
    this.props.history.push(invoiceEditPage(invoice.id));
  }

  Redirect = () => {
    return <Redirect to="/app/acct/invoices" />;
  };

  launchMakePaymentDialog = () => {
    this.setState({ makePayment: !this.state.makePayment });
  };

  makePayment = (item) =>  {

    let amount

    if(item.amount != 0){
      item.amount = parseInt(item.amount)
    } else {
      amount = 0;
    }
    
    if(amount == 0) {
      this.props.makePaymentIncompleteFields('paid amount')
      return
    }
    if(item.paymentRef == ""){
      this.props.makePaymentIncompleteFields('payment reference')
      return
    } 
    if(item.paymentMethod == "" ){
      this.props.makePaymentIncompleteFields('payment method')
      return
    }
  
    
    let payment = {
      payment: {
        customer: item.customer,
        customerName: item.customerName,
        amount : item.amount,
        paymentMethod: item.paymentMethod,
        date: item.date,
        paymentRef: item.paymentRef,
        memo : item.memo,
        paymentDifference: item.paymentDifference,
        userId : localStorage.getItem('user_id'),
      },
      invoices : [{
        amount : item.amount,
        invoiceQuote : item.invoiceQuote,
        invoiceId : item.invoiceId,
        reconciled : item.reconcileInvoice,
      }]
    }

    this.props.makePayment({payment: payment, balance: []})

    this.launchMakePaymentDialog();
  };


  render() {
    
   
    const { loading, invoice, payment, amount } = this.props.invoiceToView;

    let buttonCollection = null;

    if (invoice) {
      switch (invoice.state) {
        case "Draft":

        buttonCollection = (
            <PageTitleBar
              title="View Invoice"
              actionGroup={{
                add: { onClick: () => this.newInvoice() },
                mid: { label: "Edit", onClick: () => this.edit(invoice) },
                more: [
                  {
                    label: "Confirm Invoice",
                    onClick: () => this.props.InvoiceHandleStateUpdate(invoice.id, "Confirmed")
                  },
   
                  {
                    label: "Delete Invoice",
                    onClick: () => this.props.deleteSingleInvoice(this.props.match.params.id)
                  },
                ]
              }}
            />
          )
         
          break;

        case "Current":

          buttonCollection = (
            <PageTitleBar
              title="View Invoice"
              actionGroup={{
                add: { onClick: () => this.newInvoice() },
                mid: { label: "Edit", onClick: () => this.edit(invoice) },
                more: [
                  {
                    label: "New Version Invoice",
                    onClick: () => {                   
                      this.props.InvoiceHandleStateUpdate(invoice.id, "Current")
                    }
                  },
                  {
                    label: "Confirm Invoice",
                    onClick: () => this.props.InvoiceHandleStateUpdate(invoice.id, "Confirmed")
                  }
                ]
              }}
            />
          )
        
          break;

        // case "Confirmed":
        //     buttonCollection = (
        //       <PageTitleBar
        //         title="View Invoice"
        //         actionGroup={{
        //           add: { onClick: () => this.newInvoice() },
        //           mid: { label: "Pay", onClick:() =>  this.launchMakePaymentDialog()},
        //           more: [
        //             {
        //               label: "New Version",
        //               onClick: () => {
        //                 this.props.InvoiceHandleStateUpdate(invoice.id, "Current")
        //               }
        //             }
        //           ]
        //         }}
        //       />
        //     )
        //   break;

        case "Paid":

            buttonCollection = (
              <PageTitleBar
                title="View Invoice"
                actionGroup={{
                  add: { onClick: () => this.newInvoice() },
                }}
              />
            )

          break;

        case "Cancelled":
            buttonCollection = null
            break

        default:

            buttonCollection = (
              <PageTitleBar
                title="View Invoice"
                actionGroup={{
                  add: { onClick: () => this.newInvoice() },
                  mid: { label: "Pay", onClick:() =>  this.launchMakePaymentDialog()},
                  more: [
                    {
                      label: "New Version",
                      onClick: () => {
                        this.props.InvoiceHandleStateUpdate(invoice.id, "Current")
                      }
                    }
                  ]
                }}
              />
            )
          break;
      }
    }

    if (this.props.invoiceList.deleted) {
      return <Redirect to="/app/acct/invoices" />;
    }
      

    return loading ? (
      <RctPageLoader />
    ) : invoice ? (

      <React.Fragment>
        <Helmet>
          <title>Everyday | View Invoice</title>
        </Helmet>
        
        {buttonCollection}

        <div className="row">
          
          <div className="col-md-3">
            <InvoiceCard
              quotation={invoice}
            />
          </div>

          <div className="col-md-9">
          
          
            <ProfileTabs loading={false}>

                  <div label="Overview">
                    <OverviewTab
                      quotation={invoice}
                      payment = {payment}
                      reconciledAmount={amount}
                    />
                  </div>

                  <div label="Deals">
                   {/* <DealsTab deals={customer.deals} /> */}
                  </div>

                  <div label="Events">
                    {/* <EventsTab
                      eventableType="Customer"
                      eventableId={customer.id}
                      events={customer.events}
                    /> */}
                  </div>

                  <div label="Details">
                    {/* <DetailsTab cust={customer} /> */}
                  </div>

            </ProfileTabs>
         

          </div>
        
        </div>

        {this.state.makePayment && (
          <DialogRoot
            title="Pay Invoice"
            size="sm"
            show={this.state.makePayment}
            handleHide={this.launchMakePaymentDialog}
            dialogActionLabel="Transfer"
            dialogAction={this.onSubmit}
          >
            <div className="row">
              <div className="col">
                <MakePayment
                  reconciledAmount={amount? amount: invoice.totalAmt}
                  invoice={invoice}
                  handleHide={this.launchMakePaymentDialog}
                  makePayment={this.makePayment}
                />
              </div>
            </div>
          </DialogRoot>
        )}

      </React.Fragment>
    ) : (
      <PageErrorMessage
        heading="Not Found"
        message="This could be because of a network problem or the record might have been deleted"
      />
    );
  }
}
const mapStateToProps = ({ accountingState }) => {
  const { invoiceState } = accountingState;
  const { invoiceToView, invoiceList } = invoiceState;
  return { invoiceToView, invoiceList };
};

export default connect(
  mapStateToProps,
  { 
    getSingleInvoice, 
    clearSingleInvoice, 
    deleteSingleInvoice, 
    InvoiceHandleStateUpdate, 
    InvoiceHandleStateCreateNewVersion, 
    InvoiceHandleStateRevertPreviousVersion,
    makePayment,
    makePaymentIncompleteFields
  }
)(acct_view_invoice);

// class acct_view_invoice extends React.Component {

//   render() {
//     return(
//       <div>Hello World</div>
//     )
//   }
// }

// export default acct_view_invoice