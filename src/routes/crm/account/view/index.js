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
import AccountCard from "../components/AccountCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
// Tabs
import OverviewTab from "./tabs/Overview";
import DetailsTab from "./tabs/Details";
import DealsTab from "./tabs/Deals";
import EventsTab from "../../components/EventsTab";

// Routes
import {
  accountEditPage,
  accountListPage,
  dealNewPage,
  accountNewPage
} from "Helpers/crmURL";
// Actions
import {
  getSingleAccount,
  clearSingleAccount,
  addNoteAccount,
  setAccountActive,
  deleteAccount,
  transferAccount
} from "Ducks/crm/account";
// Add events dialog

class crm_view_account extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.handleNewDeal = this.handleNewDeal.bind(this);
    this.addNote = this.addNote.bind(this);
    this.newAcct = this.newAcct.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleAccount(id);
  }
  componentWillUnmount() {
    this.props.clearSingleAccount();
  }

  /**
   * New
   */
  newAcct() {
    this.props.history.push(accountNewPage);
  }

  /**
   * Edit
   */
  edit(id) {
    this.props.history.push(accountEditPage(id));
  }

  /**
   * Refresh
   */
  refresh(id) {
    this.props.getSingleAccount(id);
  }

  /**
   * Transfer Record
   */
  transfer(account) {
    this.props.show("transfer_record", {
      name: account.name,
      currentOwner: account.userId,
      action: val =>
        this.props.transferAccount(account.id, val, this.props.history)
    });
  }

  /**
   * DELETE RECORD
   */
  handleDelete(acctId) {
    this.props.deleteAccount(acctId);
    setTimeout(() => {
      this.props.history.push(accountListPage);
    }, 500);
  }
  delete(acct) {
    this.props.show("alert_delete", {
      name: acct.name,
      action: () => this.handleDelete(acct.id)
    });
  }

  newEvent() {
    console.log("new events");
  }
  handleNewDeal() {
    this.props.history.push(dealNewPage);
  }
  setInactive(acct) {
    this.props.setAccountActive(acct.id, !acct.isActive);
  }

  /**
   * NEW NOTE
   */
  addNote(note) {
    this.props.addNoteAccount(this.props.match.params.id, note);
  }

  render() {
    const { loading, account, sectionLoading } = this.props.accountToView;
    return loading ? (
      <RctPageLoader />
    ) : account ? (
      <React.Fragment>
        <Helmet>
          <title>Everyday | View Account</title>
        </Helmet>
        <PageTitleBar
          title="View Account"
          actionGroup={{
            add: { onClick: this.newAcct },
            mid: { label: "Edit", onClick: () => this.edit(account.id) },
            more: [
              {
                label: "Refresh",
                onClick: () => this.refresh(account.id)
              },
              {
                label: "Transfer Record",
                onClick: () => this.transfer(account)
              },
              {
                label: "Change Active Status",
                onClick: () => this.setInactive(account)
              },
              { label: "Delete", onClick: () => this.delete(account) }
            ]
          }}
        />
        <div className="row">
          <div className="col-lg-3">
            <AccountCard acct={account} />
          </div>
          <div className="col-lg-9">
            <ProfileTabs loading={sectionLoading}>
              <div label="Overview">
                <OverviewTab acct={account} />
              </div>
              <div label="Deals">
                <DealsTab deals={account.deals} />
              </div>
              <div label="Events">
                <EventsTab
                  events={account.events}
                  eventableType="Account"
                  eventableId={account.id}
                />
              </div>
              <div label="Details">
                <DetailsTab acct={account} />
              </div>
            </ProfileTabs>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <RecordNotFound />
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { accountState } = crmState;
  const { accountToView } = accountState;
  return { accountToView };
};

export default connect(
  mapStateToProps,
  {
    show,
    getSingleAccount,
    clearSingleAccount,
    addNoteAccount,
    setAccountActive,
    deleteAccount,
    transferAccount
  }
)(crm_view_account);
