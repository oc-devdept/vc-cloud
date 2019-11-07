import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";

// Components
import RctPageLoader from "Components/RctPageLoader";
import PageErrorMessage from "Components/Error/PageErrorMessage";

import ViewCredit from "../components/ViewCredit"
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

import BalancePayment from "../components/tables/BalancePayment";



// Actions
// import { getSingleCreditNote, convertSingleCreditNote } from "Actions";
// Actions
import {
  getSingleCreditNote, convertSingleCreditNote
} from "Ducks/accounting/credit";

class acct_view_payment extends Component {

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleCreditNote(id);
  }

  componentWillUnmount() {
    // this.props.clearSinglePayment();
  }

  _submitPayment = () => {
    const r = window.confirm(`Are you sure? You are attempting to pay off the remaining amount. Click Ok to continue.`); if(r == true){
      var id = this.props.match.params.id;
      this.props.convertSingleCreditNote(id)
    }
  }

  render() {

    const { loading, creditNote, creditReconcile } = this.props.creditNoteToView;

    let buttonTitle = ""
    let buttonDisable = true
    if(creditNote){
      switch(creditNote.reconciled){
        case true:
          buttonTitle = "Credit Note Paid"
          buttonDisable = false
          break
        default:
          buttonTitle = "Pay Off Remaining Balance"
          break
      }
    }

    return loading ? (
      <RctPageLoader />
    ) : creditNote ? (

      <React.Fragment>
    
        <Helmet>
            <title>Everyday | View Payment</title>
        </Helmet>


        <FormWrapper
          onSave={this._submitPayment}
          name={buttonTitle}
          disabled={buttonDisable}
          title={`Payment for ${creditNote.customerName}`}
        >
        
          <form autoComplete="off">

            <FormInputLayout
              title="Key Information"
              desc="Payment information"
            >

              <ViewCredit
                state={creditNote}
              />
                
            </FormInputLayout>

            <BalancePayment
              title={'Credit Balances'}
              tableData={creditReconcile}
            />
      
          </form>

        </FormWrapper>
              
             
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
  const { creditNoteState } = accountingState;
  const { creditNoteToView } = creditNoteState;
  return { creditNoteToView };
};

export default connect(
  mapStateToProps,
  { getSingleCreditNote, convertSingleCreditNote }
)(acct_view_payment);

