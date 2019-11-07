import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// List View
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

// ListSummary
// import ListSummary from "Components/ListSummary";
// import ShowListSummaryButton from "Components/ShowListSummaryButton";

// List
import QuotationList from "./components/QuotationList";
import { quoteNewPage } from "Helpers/accountingURL";

// Actions
// import {
//   changeQuotationView,
//   toggleQuotationDropDown,
//   toggleQuotationSummary,
//   getAllQuotation,
//   getQuotationSummary
// } from "Actions";

import {
  changeQuotationView,
  toggleQuotationDropDown,
  toggleQuotationSummary,
  getAllQuotation,
  getQuotationSummary
} from "Ducks/accounting/quotation";


class acct_quotation extends Component {
  componentDidMount() {
    this.props.getAllQuotation();
    this.props.getQuotationSummary();
  }

  refresh() {
    // this.props.getAllLead();
  }

  importQuotation() {
    // this.props.history.push(leadImportPage);
  }

  newQuotation = () => {
    this.props.history.push(quoteNewPage);
  };

  render() {
    const {
      dropdownOpen,
      options,
      nowShowing,
      action,
      loading,
      tableData
    } = this.props.quotationState.quotationList;

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Quotations</title>
          <meta name="description" content="Everyday Quotation Management" />
        </Helmet>
        <PageTitleBar
          title={"All Quotations"}
          // createLink={quoteNewPage}
          actionGroup={{
            add: { onClick: this.newQuotation },
            mid: { label: "Import", onClick: this.importQuotation },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/* showSummary && <ListSummary summary={summary} /> */}
        <QuotationList
          // edit
          title={nowShowing}
          action={action}
          loading={loading}
          tableData={tableData}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accountingState }) => {
  const { quotationState } = accountingState;
  return { quotationState };
};

export default connect(
  mapStateToProps,
  {
    changeQuotationView,
    toggleQuotationDropDown,
    toggleQuotationSummary,
    getAllQuotation,
    getQuotationSummary
  }
)(acct_quotation);
