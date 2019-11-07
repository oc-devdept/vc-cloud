import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

import QuotationForm from "../components/QuotationForm";

// Actions
import { submitNewQuotation } from "Ducks/accounting/quotation";

class acct_new_quote extends Component {
  state = {};


  _quotationParent = (item) =>{

    const reminder = {
        title: "Client ZXY Meeting", // Title of the content
        description: "SEO & SEM & Digital Consultation", // any description of the notification message 
        reminderMedium:{
          "email": "igc14.gianjie@gmail.com",
          "sms": "",
        },
        reminderTime: Date.now(),
        status: {
          result: null, // Null || not created // True for success || False for failure,
          response: null, // Null || not created || Successfully delivered || Error msg
          send_data: null, // Null || not created || Execution time. 
        },
        reminderType : "Quotation", // Leads Template ,
        isRecurring : false,
        recurringInterval: ""
    }
   
    const data = {
      data : item,
      reminder : reminder
    }

    this.props.submitNewQuotation(data)
  }


  render() {

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Quotation</title>
          <meta name="description" content="Everyday Quotation Creation" />
        </Helmet>
        <QuotationForm 
          title="sidebar.newQuotation"
          handleSubmit={this._quotationParent}
          edit={false}
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({accountingState}) => {
  return {accountingState};
};

export default connect(
  mapStateToProps,
  { 
    submitNewQuotation
  }
)(acct_new_quote);

