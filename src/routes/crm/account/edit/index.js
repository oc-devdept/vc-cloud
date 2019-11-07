import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// Page Components
import AccountForm from "../components/forms/AccountForm";
import RctPageLoader from "Components/RctPageLoader";

// Actions
import { editAccount, getSingleAccount } from "Ducks/crm/account";

class crm_new_account extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleAccount(id);
  }
  render() {
    const { loading, account } = this.props.accountToView;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Edit Account</title>
        </Helmet>
        {loading ? (
          <RctPageLoader />
        ) : (
          <AccountForm
            title="sidebar.editAccount"
            edit={account}
            handleSubmit={this.props.editAccount}
          />
        )}
      </React.Fragment>
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
  { editAccount, getSingleAccount }
)(crm_new_account);
