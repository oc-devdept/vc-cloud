import React from "react";
import { connect } from "react-redux";

// Sub components
import Helmet from "Components/Helmet";

// Page Components
import LeadForm from "../components/forms/LeadForm";

// Actions
import { newLead } from "Ducks/crm/lead";

const crm_new_lead = props => (
  <React.Fragment>
    <Helmet title="New Lead" />
    <LeadForm title="sidebar.newLead" handleSubmit={props.newLead} />
  </React.Fragment>
);

export default connect(null, { newLead })(crm_new_lead);
