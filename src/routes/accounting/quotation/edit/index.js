import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

import PageErrorMessage from "Components/Error/PageErrorMessage";
import RctPageLoader from "Components/RctPageLoader";
import QuotationForm from "../components/QuotationForm";

// Actions
import {
  getSingleQuotation,
  clearSingleQuotation,
  submitNewQuote
} from "Ducks/accounting/quotation";

class acct_edit_quotation extends Component {

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleQuotation(id, true);
  }

  componentWillUnmount() {
    this.props.clearSingleQuotation();
  }

  _quotationParent = item => {
    this.props.submitNewQuote(item);
  };

  render() {

    const { loading, quotation } = this.props.quotationToView;

    return loading ? (
      <RctPageLoader />
    ) : quotation ? (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Quotation</title>
          <meta name="description" content="Everyday Quotation Creation" />
        </Helmet>

        <QuotationForm
          title="sidebar.newQuotation"
          handleSubmit={this._quotationParent}
          edit={true}
          quotationData={quotation}
        />
      </React.Fragment>
    ) : (
      <PageErrorMessage
        heading="Not Found"
        message="This could be because of a network problem or the record might have been deleted"
      />
    );
  }
}

const mapStateToProps = ({ accountingState, crmState, usersState }) => {
  const { quotationState } = accountingState;
  const { quotationToView, quotationList, quotationForm } = quotationState;

  return { quotationToView, quotationList, quotationForm };
};

// deleted

export default connect(
  mapStateToProps,
  { getSingleQuotation, clearSingleQuotation, submitNewQuote }
)(acct_edit_quotation);
