import React from "react";
import { connect } from "react-redux";

// Sub components
import Helmet from "Components/Helmet";

// Page Components
import AccountForm from "../components/forms/AccountForm";

// Actions
import { newAccount } from "Ducks/crm/account";

const crm_new_account = props => (
  <React.Fragment>
    <Helmet title="New Account" />
    <AccountForm title="sidebar.newAccount" handleSubmit={props.newAccount} />
  </React.Fragment>
);

export default connect(null, { newAccount })(crm_new_account);
