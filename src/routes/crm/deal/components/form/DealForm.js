import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import DealFormLayout from "../Layout/DealFormLayout";

// Input Components
import FormInput from "Components/Form/FormInput";
import CustomerPicker from "Routes/crm/components/CustomerPicker";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

// Actions
import { getDealFormFields } from "Ducks/crm/deal";

const initialState = {
  deal: {
    userId: localStorage.getItem("user_id"),
    name: "",
    amount: "",
    accountId: "",
    customerId: "",
    stageId: "",
    sourceId: "",
    typeId: "",
    info: "",
    products: {}
  }
};

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
  }
  componentDidMount() {
    this.props.getDealFormFields();
    if (this.props.edit) this.setState({ deal: this.props.edit });
  }

  handleChange(field, value) {
    this.setState({ deal: { ...this.state.deal, [field]: value } });
  }

  onSubmit() {
    this.props.handleSubmit(this.state.deal, true, this.props.history);
  }

  onSaveNew() {
    this.props.handleSubmit(this.state.deal, false);
    this.setState(initialState);
  }

  checkDisabled() {
    const { name, userId, stageId } = this.state.deal;
    const disabled = name && userId && stageId;
    return disabled;
  }

  render() {
    const { deal } = this.state;
    const { loading, fields } = this.props.dealForm;
    const { users, accounts, leadSource, dealStage, dealType } = fields;
    const { edit, title } = this.props;
    const formFields = {
      name: (
        <FormInput
          label="Name"
          value={deal.name}
          target="name"
          handleChange={this.handleChange}
        />
      ),

      closingDate: edit && (
        <DatePickerInput
          label="Closing Date"
          value={deal.closingDate ? deal.closingDate : null}
          target="closingDate"
          handleChange={this.handleChange}
        />
      ),
      owner: !edit && (
        <FormInput
          label="Owner"
          value={deal.userId}
          required={!deal.userId}
          selectValues={users}
          target="userId"
          handleChange={this.handleChange}
        />
      ),
      stage: (
        <FormInput
          label="Stage"
          value={deal.stageId}
          selectValues={dealStage}
          required={!deal.stageId}
          target="stageId"
          handleChange={this.handleChange}
        />
      ),
      source: (
        <FormInput
          label="Source"
          value={deal.sourceId}
          selectValues={leadSource}
          target="sourceId"
          handleChange={this.handleChange}
        />
      ),
      customer: (
        <CustomerPicker
          value={deal.customerId}
          target="customerId"
          handleChange={this.handleChange}
        />
      ),
      type: (
        <FormInput
          label="Type"
          value={deal.typeId}
          selectValues={dealType}
          target="typeId"
          handleChange={this.handleChange}
        />
      ),
      account: (
        <FormInput
          label="Account"
          value={deal.accountId}
          selectValues={accounts}
          target="accountId"
          handleChange={this.handleChange}
        />
      ),
      description: (
        <FormInput
          multiline
          rows={4}
          label="Description"
          value={deal.info}
          target="info"
          handleChange={this.handleChange}
        />
      )
    };
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
          <DealFormLayout {...formFields} />
        </form>
        <hr />
      </FormWrapper>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { dealState } = crmState;
  const { dealForm } = dealState;
  return { dealForm };
};

export default withRouter(
  connect(mapStateToProps, {
    getDealFormFields
  })(DealForm)
);
