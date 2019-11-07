import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// List View
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
import PaymentList from "./components/tables/PaymentList";

// Actions
import {fetchAllPayment} from "Ducks/accounting/payment";

import { newPayment } from "Helpers/accountingURL";

class acct_payment extends Component {
  componentDidMount() {
    this.props.fetchAllPayment();
  }

  refresh() {
    // this.props.getAllLead();
  }

  importPayment() {
    // this.props.history.push(leadImportPage);
  }

  newPayment = () => {
    this.props.history.push(newPayment);
  };

  render() {
    const {
      dropdownOpen,
      options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.paymentState.paymentList;

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Payment</title>
          <meta name="description" content="Everyday Payment Management" />
        </Helmet>
        <PageTitleBar
          title={"All Payments"}
          actionGroup={{
            add: { onClick: this.newPayment },
            mid: { label: "Import", onClick: this.importPayment },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
          createLink={newPayment}
        />

        <PaymentList
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
  const { paymentState } = accountingState;
  return { paymentState };
};

export default connect(
  mapStateToProps,
  { fetchAllPayment }
)(acct_payment);
