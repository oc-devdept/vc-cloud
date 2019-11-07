import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// List View
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

// // ListSummary
// import ListSummary from "Components/ListSummary";
// import ShowListSummaryButton from "Components/ShowListSummaryButton";

// List
import InvoiceList from "./components/tables/InvoiceList";
import { invoiceNewPage } from "Helpers/accountingURL";

// Actions
import {
  changeInvoiceView,
  toggleInvoiceDropDown,
  toggleInvoiceSummary,
  getAllInvoice
} from "Ducks/accounting/invoice";

class acct_invoice extends Component {
  
  componentDidMount() {
    this.props.getAllInvoice();
  }

  refresh() {
    // this.props.getAllLead();
  }

  importInvoice() {
    // this.props.history.push(leadImportPage);
  }

  newInvoice = () => {
    this.props.history.push(invoiceNewPage);
  };

  render() {
    const {
      dropdownOpen,
      options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.invoiceState.invoiceList;

    const { showSummary, summary } = this.props.invoiceState.invoiceSummary;

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Invoices</title>
          <meta name="description" content="Everyday Invoice Management" />
        </Helmet>
        <PageTitleBar
          title={"All Invoices"}
          actionGroup={{
            add: { onClick: this.newInvoice },
            mid: { label: "Import", onClick: this.importInvoice },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
          createLink={invoiceNewPage}
        />
        {/* {showSummary && <ListSummary summary={summary} />} */}
        <InvoiceList
          title={nowShowing}
          action={action}
          tableData={tableData}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ accountingState }) => {
  const { invoiceState } = accountingState;
  return { invoiceState };
};

export default connect(
  mapStateToProps,
  {
    changeInvoiceView,
    toggleInvoiceDropDown,
    toggleInvoiceSummary,
    getAllInvoice
  }
)(acct_invoice);
