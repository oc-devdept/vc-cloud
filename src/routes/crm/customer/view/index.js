import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
// Global Req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
//Page Components
import RctPageLoader from "Components/RctPageLoader";
import RecordNotFound from "Components/Error/RecordNotFound";
// Layout
import CustomerCard from "../components/CustomerCard";
import ProfileTabs from "Components/Layout/ProfileTabs";

// Tabs
import Overview from "./tabs/Overview";
import Booking from "./tabs/Booking";
import PastTransaction from "./tabs/PastTransaction";
import DetailsTab from "./tabs/Details";
import DealsTab from "./tabs/Deals";
import FollowUpTab from "../../components/FollowUp/Tab";

import api from "Api";

// routes
import {
  customerListPage,
  customerEditPage,
  customerNewPage
} from "Helpers/crmURL";
// Actions
import {
  getSingleCustomer,
  clearSingleCustomer,
  deleteCustomer,
  addNoteCustomer,
  setCustomerActive,
  transferCustomer
} from "Ducks/crm/customer";

import {
  getAllDeal
} from "Ducks/crm/deal";
// Add events dialog

class crm_view_customer extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.addNote = this.addNote.bind(this);
    this.trasnfer = this.transfer.bind(this);
    this.refresh = this.refresh.bind(this);
    this.newCust = this.newCust.bind(this);
  }

  async componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleCustomer(id);
  }

  componentWillUnmount() {
    this.props.clearSingleCustomer();
  }

  /**
   * New
   */
  newCust() {
    this.props.history.push(customerNewPage);
  }

  /**
   * Refresh
   */
  refresh(id) {
    this.props.getSingleCustomer(id);
  }

  /**
   * Edit
   */
  edit(id) {
    this.props.history.push(customerEditPage(id));
  }

  /**
   * Transfer Record
   */
  transfer(customer) {
    this.props.show("transfer_record", {
      name: customer.name,
      currentOwner: customer.userId,
      action: val =>
        this.props.transferCustomer(customer.id, val, this.props.history)
    });
  }

  /**
   * DELETE RECORD
   */
  handleDelete(custId) {
    this.props.deleteCustomer(custId);
    //console.log(custId);
    setTimeout(() => {
      this.props.history.push(customerListPage);
    }, 500);
  }
  delete(cust) {
    this.props.show("alert_delete", {
      name: cust.name,
      action: () => this.handleDelete(cust.id)
    });
  }

  newEvent() {
    console.log("new events");
  }
  setInactive(cust) {
    this.props.setCustomerActive(cust.id, !cust.isActive);
  }

  /**
   * NEW NOTE
   */
  addNote(note) {
    this.props.addNoteCustomer(this.props.match.params.id, note);
  }

  _handleDeployAgent = async id => {
    const item = await api.post(`/customers/deployAgent`, { data: { id } });
    //this.setState({ customer: item.data.fields });
    this.props.getSingleCustomer(id);
  };

  render() {
    const { sectionLoading, customer, loading } = this.props.customerToView;
    return (
      <React.Fragment>
        {loading ? (
          <RctPageLoader />
        ) : customer ? (
          <React.Fragment>
            <Helmet title="View Customer" />
            <PageTitleBar
              title="View Customer"
              actionGroup={{
                add: { onClick: this.newCust },
                mid: { label: "Edit", onClick: () => this.edit(customer.id) },
                more: [
                  {
                    label: "Refresh",
                    onClick: () => this.refresh(customer.id)
                  },
                  {
                    label: "Transfer Record",
                    onClick: () => this.transfer(customer)
                  },
                  {
                    label: "Change Active Status",
                    onClick: () => this.setInactive(customer)
                  },
                  { label: "Delete", onClick: () => this.delete(customer) }
                ]
              }}
            />

            <div className="row">
              <div className="col-lg-3">
                <CustomerCard
                  cust={customer}
                  _handleDeployAgent={this._handleDeployAgent}
                />
              </div>
              <div className="col-lg-9">
                <ProfileTabs loading={sectionLoading}>
                  <div label="Overview">
                    <Overview cust={customer} />
                  </div>
                  <div label="Bookings">
                    <Booking customer={customer} />
                  </div>
                  <div label="All Transaction">
                    <PastTransaction transaction={customer.transaction} />
                  </div>
                  <div label="Follow Ups">
                    <FollowUpTab
                      allFollowup={customer.followUps}
                      followupableType="Customer"
                      followupableId={customer.id}
                    />
                  </div>
                  <div label="Related Deals">
                    <DealsTab customerId={customer.id} getAllDeal={this.props.getAllDeal} tableData={this.props.dealList.tableData} totalCount={this.props.dealList.totalCount}  />
                  </div>
                  <div label="Details">
                    <DetailsTab cust={customer} />
                  </div>
                </ProfileTabs>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <RecordNotFound />
        )}
      </React.Fragment>
    );
  }
}
// map state to props
const mapStateToProps = ({ crmState }) => {
  const { customerState, dealState } = crmState;
  const { customerToView } = customerState;
  const { dealList } = dealState;
  return { customerToView, dealList };
};

export default connect(mapStateToProps, {
  show,
  getSingleCustomer,
  clearSingleCustomer,
  deleteCustomer,
  addNoteCustomer,
  setCustomerActive,
  transferCustomer,
  getAllDeal
})(crm_view_customer);
