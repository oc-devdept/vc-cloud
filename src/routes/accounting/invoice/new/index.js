import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// intl messages
import IntlMessages from "Util/IntlMessages";

// Page Components
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import InvoiceForm from "../components/InvoiceForm";

import { 
  submitNewInvoice
} from "Ducks/accounting/invoice";


class acct_new_invoice extends Component {

  state = {};

  _invoiceParent = (item) =>{
    this.props.submitNewInvoice(item)
  }

  render() {

    return (
      <React.Fragment>
        <Helmet>
            <title>Everyday | New Invoice</title>
            <meta name="description" content="Everyday Invoices Creation" />
        </Helmet>
        <InvoiceForm 
          title="sidebar.newQuotation" 
          handleSubmit={this._invoiceParent} 
        />
      </React.Fragment>
    );
  }
}
// 

const mapStateToProps = ({accountingState}) => {
  return {
    accountingState
  };
};

export default connect(
  mapStateToProps,
  { 
    submitNewInvoice
  }
)(acct_new_invoice);

