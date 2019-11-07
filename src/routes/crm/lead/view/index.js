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
import LeadCard from "../components/LeadCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
// Tabs
import LeadOverviewTab from "./tabs/Overview";
import LeadDetailsTab from "./tabs/Details";
import EventsTab from "../../components/EventsTab";
import FollowUpTab from "../../components/FollowUp/Tab";
// Modals
import ConvertLeadModal from "../components/dialogs/ConvertLead";
import ConvertSuccessModal from "../components/dialogs/ConvertSuccess";
// routes
import { leadEditPage, leadListPage, leadNewPage } from "Helpers/crmURL";
//Actions
import {
  getSingleLead,
  clearSingleLead,
  handleConvertModal,
  deleteLead,
  addNoteLead,
  checkAccountExist,
  transferLead
} from "Ducks/crm/lead";

class crm_view_lead extends Component {
  constructor(props) {
    super(props);
    this.newLead = this.newLead.bind(this);
    this.startConvert = this.startConvert.bind(this);
    this.edit = this.edit.bind(this);
    this.addNote = this.addNote.bind(this);
    this.transfer = this.transfer.bind(this);
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleLead(id);
  }
  componentWillUnmount() {
    this.props.clearSingleLead();
  }

  /**
   * New Lead
   */
  newLead() {
    this.props.history.push(leadNewPage);
  }

  /**
   * Refresh
   */
  refresh(id) {
    this.props.getSingleLead(id);
  }

  /**
   * Transfer Record
   */
  transfer(lead) {
    this.props.show("transfer_record", {
      name: lead.name,
      currentOwner: lead.userId,
      action: val => this.props.transferLead(lead.id, val, this.props.history)
    });
  }

  /**
   * Edit
   */
  edit(id) {
    this.props.history.push(leadEditPage(id));
  }

  /**
   * DELETE RECORD
   */
  handleDelete(leadId) {
    this.props.deleteLead(leadId);
    setTimeout(() => {
      this.props.history.push(leadListPage);
    }, 500);
  }
  delete(lead) {
    this.props.show("alert_delete", {
      name: lead.name,
      action: () => this.handleDelete(lead.id)
    });
  }

  /**
   * START CONVERT LEAD
   */
  startConvert(companyName) {
    this.props.checkAccountExist(companyName);
  }

  /**
   * NEW NOTE
   */
  addNote(note) {
    this.props.addNoteLead(this.props.match.params.id, note);
  }

  render() {
    const { lead, loading, sectionLoading } = this.props.leadToView;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | View Lead</title>
        </Helmet>
        {loading ? (
          <RctPageLoader />
        ) : lead ? (
          <React.Fragment>
            <PageTitleBar
              title="View Lead"
              actionButton={[
                {
                  label: "Convert",
                  onClick: () => this.startConvert(lead.companyName),
                  classes: "bg-success text-white"
                }
              ]}
              actionGroup={{
                add: { onClick: this.newLead },
                mid: { label: "Edit", onClick: () => this.edit(lead.id) },
                more: [
                  { label: "Refresh", onClick: () => this.refresh(lead.id) },
                  {
                    label: "Convert",
                    onClick: () => this.startConvert(lead.companyName)
                  },
                  {
                    label: "Transfer Record",
                    onClick: () => this.transfer(lead)
                  },
                  { label: "Delete", onClick: () => this.delete(lead) }
                ]
              }}
            />
            <div className="row">
              <div className="col-lg-3">
                <LeadCard lead={lead} />
              </div>
              <div className="col-lg-9">
                <ProfileTabs loading={sectionLoading}>
                  <div label="Overview">
                    <LeadOverviewTab lead={lead} />
                  </div>
                  <div label="Follow Ups">
                    <FollowUpTab />
                  </div>
                  <div label="Events">
                    <EventsTab
                      events={lead.events}
                      eventableType={"Lead"}
                      eventableId={lead.id}
                    />
                  </div>
                  <div label="Details">
                    <LeadDetailsTab lead={lead} />
                  </div>
                </ProfileTabs>
              </div>
            </div>

            <ConvertLeadModal />
            <ConvertSuccessModal />
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
  const { leadState } = crmState;
  const { leadToView } = leadState;
  return { leadToView };
};

export default connect(
  mapStateToProps,
  {
    getSingleLead,
    clearSingleLead,
    handleConvertModal,
    show,
    deleteLead,
    addNoteLead,
    checkAccountExist,
    transferLead
  }
)(crm_view_lead);
