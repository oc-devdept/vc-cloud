import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import {
  KeyInformation,
  AccountInformation,
  ShippingInformation
} from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";
import AddressFormInput from "Components/Form/Inputs/AddressFormInput";

// Actions
import { getAccountFormFields } from "Ducks/crm/account";

const initialState = {
  account: {
    userId: localStorage.getItem("user_id"),
    baseContact: {
      name: "",
      email: "",
      mobile: "",
      fax: "",
      phone: "",
      website: "",
      title: "",
      _address: { address_1: "", address_2: "", city: "", zip: "" }
    }
  }
};

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
  }
  componentDidMount() {
    this.props.getAccountFormFields();
    if (this.props.edit) this.setState({ account: this.props.edit });
  }

  handleContact(field, value) {
    this.setState(prevState => ({
      ...prevState,
      account: {
        ...prevState.account,
        baseContact: {
          ...prevState.account.baseContact,
          [field]: value
        }
      }
    }));
  }

  handleAccount(field, value) {
    this.setState(prevState => ({
      ...prevState,
      account: {
        ...prevState.account,
        [field]: value
      }
    }));
  }

  handleAddress(field, value) {
    this.setState(prevState => ({
      ...prevState,
      account: {
        ...prevState.account,
        baseContact: {
          ...prevState.account.baseContact,
          _address: {
            ...prevState.account.baseContact._address,
            [field]: value
          }
        }
      }
    }));
  }

  onSubmit() {
    this.props.handleSubmit(this.state.account, true, this.props.history);
  }
  onSaveNew() {
    this.props.handleSubmit(this.state.account, false);
    this.setState(initialState);
  }

  checkDisabled() {
    const disabled =
      this.state.account.baseContact.name && this.state.account.userId;
    return disabled;
  }

  render() {
    const { loading, fields } = this.props.accountForm;
    const { edit, title } = this.props;
    const { account } = this.state;
    return (
      <FormWrapper
        onSave={this.onSubmit}
        onSaveNew={this.onSaveNew}
        disabled={this.checkDisabled()}
        edit={edit}
        title={title}
      >
        {loading && <RctSectionLoader />}
        <hr />
        <form autoComplete="off">
          <KeyInformation
            name={
              <FormInput
                label="Name"
                value={account.baseContact.name}
                required={!account.baseContact.name}
                target="name"
                handleChange={this.handleContact}
              />
            }
            industry={
              <FormInput
                label="Industry"
                value={account.industryId ? account.industryId : ""}
                selectValues={fields.industry}
                target="industryId"
                handleChange={this.handleAccount}
              />
            }
            owner={
              !edit && (
                <FormInput
                  label="Owner"
                  value={account.userId ? account.userId : ""}
                  required={!account.userId}
                  selectValues={fields.users}
                  target="userId"
                  handleChange={this.handleAccount}
                />
              )
            }
          />
          <hr />
          <AccountInformation
            office={
              <FormInput
                label="Office"
                value={account.baseContact.phone}
                target="phone"
                handleChange={this.handleContact}
              />
            }
            website={
              <FormInput
                label="Website"
                value={account.baseContact.website}
                target="website"
                handleChange={this.handleContact}
              />
            }
            fax={
              <FormInput
                label="Fax"
                value={account.baseContact.fax}
                target="fax"
                handleChange={this.handleContact}
              />
            }
            description={
              <FormInput
                multiline
                rows={4}
                label="Description"
                value={account.baseContact.info}
                target="info"
                handleChange={this.handleContact}
              />
            }
          />
          <hr />
          <ShippingInformation
            address={
              <AddressFormInput
                handleChange={this.handleAddress}
                address_1={account.baseContact._address.address_1}
                address_2={account.baseContact._address.address_2}
                city={account.baseContact._address.city}
                state={account.baseContact._address.state}
                zip={account.baseContact._address.zip}
              />
            }
          />
          <hr />
        </form>
      </FormWrapper>
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { accountState } = crmState;
  const { accountForm } = accountState;
  return { accountForm };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getAccountFormFields
    }
  )(AccountForm)
);
