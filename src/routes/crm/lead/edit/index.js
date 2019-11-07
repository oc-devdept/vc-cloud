import React, { Component } from "react";
import { connect } from "react-redux";
// Page Components
import { Helmet } from "react-helmet";
import RctPageLoader from "Components/RctPageLoader";
import LeadForm from "../components/forms/LeadForm";

// Actions
import { editLead, getSingleLead } from "Ducks/crm/lead";

class crm_edit_lead extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleLead(id);
  }

  render() {
    const { lead, loading } = this.props.leadToView;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Edit Lead</title>
        </Helmet>
        {loading ? (
          <RctPageLoader />
        ) : (
          <LeadForm
            title="sidebar.editLead"
            edit={lead}
            handleSubmit={this.props.editLead}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { leadState } = crmState;
  const { leadToView } = leadState;
  return { leadToView };
};

export default connect(
  mapStateToProps,
  { editLead, getSingleLead }
)(crm_edit_lead);
