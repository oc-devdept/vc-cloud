import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import { KeyInformation, DealInformation } from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";
import AmountInput from "Components/Form/Inputs/AmountInput";
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
    info: ""
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
    const { name, userId, amount, stageId, accountId } = this.state.deal;
    const disabled = name && userId && amount && stageId && accountId;
    return disabled;
  }

  render() {
    const { deal } = this.state;
    const { loading, fields } = this.props.dealForm;
    const {
      users,
      accounts,
      customers,
      leadSource,
      dealStage,
      dealType
    } = fields;
    const { edit, title } = this.props;
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
                value={deal.name}
                target="name"
                handleChange={this.handleChange}
              />
            }
            amount={
              <AmountInput
                label="Amount"
                value={deal.amount}
                required={!deal.amount}
                target="amount"
                handleChange={this.handleChange}
              />
            }
            closingDate={
              <DatePickerInput
                label="Closing Date"
                value={deal.closingDate ? deal.closingDate : null}
                target="closingDate"
                handleChange={this.handleChange}
              />
            }
            owner={
              !edit && (
                <FormInput
                  label="Owner"
                  value={deal.userId}
                  required={!deal.userId}
                  selectValues={users}
                  target="userId"
                  handleChange={this.handleChange}
                />
              )
            }
            account={
              <FormInput
                label="Account"
                value={deal.accountId}
                selectValues={accounts}
                required={!deal.accountId}
                target="accountId"
                handleChange={this.handleChange}
              />
            }
            stage={
              <FormInput
                label="Stage"
                value={deal.stageId}
                selectValues={dealStage}
                required={!deal.stageId}
                target="stageId"
                handleChange={this.handleChange}
              />
            }
          />
          <hr />
          <DealInformation
            source={
              <FormInput
                label="Source"
                value={deal.sourceId}
                selectValues={leadSource}
                target="sourceId"
                handleChange={this.handleChange}
              />
            }
            customer={
              <FormInput
                label="Customer"
                value={deal.customerId}
                selectValues={customers}
                target="customerId"
                handleChange={this.handleChange}
              />
            }
            type={
              <FormInput
                label="Type"
                value={deal.typeId}
                selectValues={dealType}
                target="typeId"
                handleChange={this.handleChange}
              />
            }
            description={
              <FormInput
                multiline
                rows={4}
                label="Description"
                value={deal.info}
                target="info"
                handleChange={this.handleChange}
              />
            }
          />
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
  connect(
    mapStateToProps,
    {
      getDealFormFields
    }
  )(DealForm)
);
