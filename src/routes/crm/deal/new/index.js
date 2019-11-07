import React from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// Form Componnet
import DealForm from "../components/form/DealForm";

// Actions
import { newDeal } from "Ducks/crm/deal";

const crm_new_deal = props => (
  <React.Fragment>
    <Helmet>
      <title>Everyday | New Deal</title>
      <meta name="description" content="Everyday Deals Creation" />
    </Helmet>
    <DealForm title="sidebar.newDeal" handleSubmit={props.newDeal} />
  </React.Fragment>
);

export default connect(
  null,
  { newDeal }
)(crm_new_deal);
