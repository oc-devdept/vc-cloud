import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// List View
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
import CreditNoteList from "./components/tables/CreditNoteList";

// Actions
import {
  getAllCreditNote
} from "Ducks/accounting/credit";

import { crednoteNewPage, singleCredNote } from "Helpers/accountingURL";

class acct_payment extends Component {
  componentDidMount() {
    this.props.getAllCreditNote();
  }

  refresh() {
    // this.props.getAllLead();
  }

  importPayment() {
    // this.props.history.push(leadImportPage);
  }

  newCredit = () => {
    this.props.history.push(crednoteNewPage);
  };

  render() {
    const {
      action,
      loading,
      tableData
    } = this.props.creditNoteState.creditNoteList;

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Payment</title>
          <meta name="description" content="Everyday Payment Management" />
        </Helmet>
        <PageTitleBar
          title={"All Credit Notes"}
          actionGroup={{
            add: { onClick: this.newCredit },
            mid: { label: "Import", onClick: this.importPayment },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
          createLink={crednoteNewPage}
        />
        {/* {showSummary && <ListSummary summary={summary} />} */}
        <CreditNoteList
          title={"All Credit Notes"}
          action={action}
          tableData={tableData}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ accountingState }) => {
  const { paymentState, creditNoteState } = accountingState;
  return { paymentState, creditNoteState };
};

export default connect(
  mapStateToProps,
  { getAllCreditNote }
)(acct_payment);
