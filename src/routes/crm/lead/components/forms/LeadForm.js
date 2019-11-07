import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import { KeyInformation, LeadInformation, CompanyInformation } from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";
import CompanyPicker from "Components/Form/Pickers/CompanyPicker";
import AddressFormInput from "Components/Form/Inputs/AddressFormInput";

// Actions
import { getLeadFormFields } from "Ducks/crm/lead";

const initialState = {
  lead: {
    userId: localStorage.getItem("user_id"),
    companyName: "",
    baseContact: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      phone: "",
      website: "",
      title: "",
      birthday: "",
      _address: { address_1: "", address_2: "", city: "", zip: "" }
    }
  }
};

class LeadForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleLead = this.handleLead.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
  }

  componentDidMount() {
    this.props.getLeadFormFields();
    if (this.props.edit) this.setState({ lead: this.props.edit });
  }

  handleContact(field, value) {
    this.setState(prevState => ({
      ...prevState,
      lead: {
        ...prevState.lead,
        baseContact: {
          ...prevState.lead.baseContact,
          [field]: value
        }
      }
    }));
  }

  handleLead(field, value) {
    this.setState(prevState => ({
      ...prevState,
      lead: {
        ...prevState.lead,
        [field]: value
      }
    }));
  }

  handleAddress(field, value) {
    this.setState(prevState => ({
      ...prevState,
      lead: {
        ...prevState.lead,
        baseContact: {
          ...prevState.lead.baseContact,
          _address: {
            ...prevState.lead.baseContact._address,
            [field]: value
          }
        }
      }
    }));
  }

  onSubmit() {
    this.props.handleSubmit(this.state.lead, true, this.props.history);
  }

  onSaveNew() {
    this.props.handleSubmit(this.state.lead, false);
    this.setState(initialState);
  }

  checkDisabled() {
    const disabled =
      this.state.lead.baseContact.lastName &&
      this.state.lead.companyName &&
      this.state.lead.userId &&
      this.state.lead.statusId;
    return disabled;
  }

  render() {
    const { loading, fields } = this.props.leadForm;
    const { edit, title } = this.props;
    const { lead } = this.state;
    return (
      <FormWrapper
        onSave={this.onSubmit}
        onSaveNew={this.onSaveNew}
        disabled={this.checkDisabled()}
        edit={edit}
        title={title}
      >
        {loading && <RctSectionLoader />}
        <form autoComplete="off">
          <hr />
          <KeyInformation
            firstName={
              <FormInput
                label="First Name"
                value={lead.baseContact.firstName}
                target="firstName"
                handleChange={this.handleContact}
              />
            }
            lastName={
              <FormInput
                label="Last Name"
                value={lead.baseContact.lastName}
                required={!lead.baseContact.lastName}
                target="lastName"
                handleChange={this.handleContact}
              />
            }
            owner={
              !edit && (
                <FormInput
                  label="Owner"
                  value={lead.userId ? lead.userId : ""}
                  required={!lead.userId}
                  selectValues={fields.users}
                  target="userId"
                  handleChange={this.handleLead}
                />
              )
            }
            company={
              <CompanyPicker
                value={lead.companyName}
                handleChange={this.handleLead}
                target="companyName"
              />
            }
            status={
              <FormInput
                label="Status"
                value={lead.statusId ? lead.statusId : ""}
                selectValues={fields.leadStatus}
                required={!lead.statusId}
                target="statusId"
                handleChange={this.handleLead}
              />
            }
          />
          <hr />
          <LeadInformation
            email={
              <FormInput
                label="Email"
                value={lead.baseContact.email}
                target="email"
                handleChange={this.handleContact}
              />
            }
            title={
              <FormInput
                label="Job Title"
                value={lead.baseContact.title}
                target="title"
                handleChange={this.handleContact}
              />
            }
            interest={
              <FormInput
                label="Lead Interest"
                value={lead.interest ? lead.interest : ""}
                selectValues={fields.leadInterest}
                target="interest"
                handleChange={this.handleLead}
              />
            }
            mobile={
              <FormInput
                label="Mobile"
                value={lead.baseContact.mobile}
                target="mobile"
                handleChange={this.handleContact}
              />
            }
            source={
              <FormInput
                label="Source"
                value={lead.sourceId ? lead.sourceId : ""}
                selectValues={fields.leadSource}
                target="sourceId"
                handleChange={this.handleLead}
              />
            }
            birthday={
              <DatePickerInput
                label="Birthday"
                value={
                  lead.baseContact.birthday ? lead.baseContact.birthday : null
                }
                target="birthday"
                handleChange={this.handleContact}
              />
            }
            description={
              <FormInput
                multiline
                rows={4}
                label="Description"
                value={lead.baseContact.info}
                target="info"
                handleChange={this.handleContact}
              />
            }
          />
          <hr />
          <CompanyInformation
            industry={
              <FormInput
                label="Industry"
                value={lead.industryId ? lead.industryId : ""}
                selectValues={fields.industry}
                target="industryId"
                handleChange={this.handleLead}
              />
            }
            website={
              <FormInput
                label="Website"
                value={lead.baseContact.website}
                target="website"
                handleChange={this.handleContact}
              />
            }
            office={
              <FormInput
                label="Office"
                value={lead.baseContact.phone}
                target="phone"
                handleChange={this.handleContact}
              />
            }
            fax={
              <FormInput
                label="Fax"
                value={lead.baseContact.fax}
                target="fax"
                handleChange={this.handleContact}
              />
            }
            address={
              <AddressFormInput
                address_1={lead.baseContact._address.address_1}
                address_2={lead.baseContact._address.address_2}
                city={lead.baseContact._address.city}
                zip={lead.baseContact._address.zip}
                handleChange={this.handleAddress}
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
  const { leadState } = crmState;
  const { leadForm } = leadState;
  return { leadForm };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getLeadFormFields
    }
  )(LeadForm)
);
