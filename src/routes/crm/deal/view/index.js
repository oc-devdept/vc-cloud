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
import DealCard from "../components/DealCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
// routes
import { dealEditPage, dealListPage, dealNewPage } from "Helpers/crmURL";
// Tabs
import OverviewTab from "./tabs/Overview";
import DetailsTab from "./tabs/Details";
import EventsTab from "../../components/EventsTab";
// Actions
import {
  getSingleDeal,
  clearSingleDeal,
  addNoteDeal,
  deleteDeal,
  transferDeal
} from "Ducks/crm/deal";
//  Update Stage/Amount,

class crm_view_deal extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.transfer = this.transfer.bind(this);
    this.newDeal = this.newDeal.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleDeal(id);
  }
  componentWillUnmount() {
    this.props.clearSingleDeal();
  }
  /**
   * New
   */
  newDeal() {
    this.props.history.push(dealNewPage);
  }
  /**
   * Refresh
   */
  refresh(id) {
    this.props.getSingleDeal(id);
  }

  /**
   * Transfer Record
   */
  transfer(deal) {
    this.props.show("transfer_record", {
      name: deal.name,
      currentOwner: deal.userId,
      action: val => this.props.transferDeal(deal.id, val, this.props.history)
    });
  }

  /**
   * Edit
   */
  edit(id) {
    this.props.history.push(dealEditPage(id));
  }

  /**
   * DELETE RECORD
   */
  handleDelete(id) {
    this.props.deleteDeal(id);
    setTimeout(() => {
      this.props.history.push(dealListPage);
    }, 500);
  }
  delete(deal) {
    this.props.show("alert_delete", {
      name: deal.name,
      action: () => this.handleDelete(deal.id)
    });
  }

  /**
   * NEW NOTE
   */
  addNote(note) {
    this.props.addNoteDeal(this.props.match.params.id, note);
  }

  render() {
    const { loading, deal, sectionLoading } = this.props.dealToView;
    return (
      <React.Fragment>
        {loading ? (
          <RctPageLoader />
        ) : deal ? (
          <React.Fragment>
            <Helmet>
              <title>Everyday | View Deal</title>
            </Helmet>
            <PageTitleBar
              title="View Deal"
              actionGroup={{
                add: { onClick: this.newDeal },
                mid: { label: "Edit", onClick: () => this.edit(deal.id) },
                more: [
                  { label: "Refresh", onClick: () => this.refresh(deal.id) },
                  {
                    label: "Transfer Record",
                    onClick: () => this.transfer(deal)
                  },
                  { label: "Delete", onClick: () => this.delete(deal) }
                ]
              }}
            />

            <div className="row">
              <div className="col-lg-3">
                <DealCard deal={deal} />
              </div>
              <div className="col-lg-9">
                <ProfileTabs loading={sectionLoading}>
                  <div label="Overview">
                    <OverviewTab deal={deal} />
                  </div>
                  <div label="Events">
                    <EventsTab
                      events={deal.events}
                      eventableType="Deal"
                      eventableId={deal.id}
                    />
                  </div>
                  <div label="Details">
                    <DetailsTab deal={deal} />
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
  const { dealState } = crmState;
  const { dealToView } = dealState;
  return { dealToView };
};

export default connect(
  mapStateToProps,
  {
    getSingleDeal,
    clearSingleDeal,
    show,
    addNoteDeal,
    deleteDeal,
    transferDeal
  }
)(crm_view_deal);
