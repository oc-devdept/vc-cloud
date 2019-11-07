import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
import { accountNewPage } from "Helpers/crmURL";
//sub components
import AccountList from "./components/AccountList";

// Actions
import {
  changeAccountView,
  toggleAccountDropDown,
  getAllAccount
} from "Ducks/crm/account";

class crm_account extends Component {
  constructor(props) {
    super(props);
    this.newAcct = this.newAcct.bind(this);
    this.refresh = this.refresh.bind(this);
    this.importAccount = this.importAccount.bind(this);
  }
  componentDidMount() {
    this.props.getAllAccount();
  }

  newAcct() {
    this.props.history.push(accountNewPage);
  }

  refresh() {
    this.props.getAllAccount();
  }
  importAccount() {
    console.log("importAccount");
  }

  render() {
    const {
      // options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.accountState.accountList;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Accounts</title>
          <meta name="description" content="Everyday Accounts Management" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newAcct },
            // mid: { label: "Import", onClick: this.importAccount },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/*
            <div className="d-flex">
               <ListViewSelector
                dropdownOpen={dropdownOpen}
                toggle={this.props.toggleAccountDropDown}
                options={options}
                nowShowing={nowShowing}
                onChangeValue={this.props.changeAccountView}
              /> 
              </div> */}
        <AccountList action={action} tableData={tableData} loading={loading} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { accountState } = crmState;
  return { accountState };
};

export default connect(
  mapStateToProps,
  {
    changeAccountView,
    toggleAccountDropDown,
    getAllAccount
  }
)(crm_account);
