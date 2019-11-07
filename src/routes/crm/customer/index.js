import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import CustomerList from "./components/CustomerList";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

import { changeCustomerView, getAllCustomer } from "Ducks/crm/customer";
import { customerNewPage } from "Helpers/crmURL";

class crm_customer extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.importCust = this.importCust.bind(this);
    this.newCust = this.newCust.bind(this);
  }
  componentDidMount() {
    this.props.getAllCustomer();
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
    const {
      // options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.customerState.customerList;

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Customers</title>
          <meta name="description" content="Everyday Customers Retention" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newCust },
            // mid: { label: "Import", onClick: this.importCust },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/* <div className="d-flex">
           <ListViewSelector
                options={options}
                nowShowing={nowShowing}
                onChangeValue={this.props.changeCustomerView}
              />
        </div> */}
        <CustomerList action={action} tableData={tableData} loading={loading} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { customerState } = crmState;
  return { customerState };
};

export default connect(
  mapStateToProps,
  {
    changeCustomerView,
    getAllCustomer
  }
)(crm_customer);
