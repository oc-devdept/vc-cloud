import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
// Global Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
//Page Components
import RctPageLoader from "Components/RctPageLoader";
import RecordNotFound from "Components/Error/RecordNotFound";
// Layout
import CustomerCard from "../components/CustomerCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
// Tabs
import OverviewTab from "./tabs/Overview";
import DetailsTab from "./tabs/Details";
import DealsTab from "./tabs/Deals";
import EventsTab from "../../components/EventsTab";

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
  componentDidMount() {
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

  render() {
    const { loading, customer, sectionLoading } = this.props.customerToView;

    return (
      <React.Fragment>
        {loading ? (
          <RctPageLoader />
        ) : customer ? (
          <React.Fragment>
            <Helmet>
              <title>Everyday | View Customer</title>
            </Helmet>
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
                <CustomerCard cust={customer} />
              </div>
              <div className="col-lg-9">
                <ProfileTabs loading={sectionLoading}>
                  <div label="Overview">
                    <OverviewTab cust={customer} />
                  </div>
                  {/*  <div label="Deals">
                    <DealsTab deals={customer.deals} />
                  </div> */}
                  <div label="Events">
                    <EventsTab
                      eventableType="Customer"
                      eventableId={customer.id}
                      events={customer.events}
                    />
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
  const { customerState } = crmState;
  const { customerToView } = customerState;
  return { customerToView };
};

export default connect(
  mapStateToProps,
  {
    show,
    getSingleCustomer,
    clearSingleCustomer,
    deleteCustomer,
    addNoteCustomer,
    setCustomerActive,
    transferCustomer
  }
)(crm_view_customer);
