import React, { Component } from "react";

//sub components
import CustomerList from "./components/CustomerList";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import { customerNewPage } from "Helpers/crmURL";

class crm_customer extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.importCust = this.importCust.bind(this);
    this.newCust = this.newCust.bind(this);
  }

  newCust() {
    this.props.history.push(customerNewPage);
  }
  refresh() {
    this.props.getAllCustomer();
  }
  importCust() {
    console.log("importCust");
  }

  render() {
    return (
      <React.Fragment>
        <Helmet title="Customers" metaDesc="Everyday Customers Retention" />
        <PageTitleBar
          title="Customer List"
          actionGroup={{
            add: { onClick: this.newCust },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        <CustomerList />
      </React.Fragment>
    );
  }
}

export default crm_customer;
