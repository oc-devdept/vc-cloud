import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import {
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import FullScreenDialog from "Components/Dialog/FullScreenDialog";
import RctSectionLoader from "Components/RctSectionLoader";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

// Content
import AccountSelection from "./AccountSelection";

// Form
import ConvertLeadForm from "../forms/ConvertLeadForm";

// Actions
import { convertLead, handleConvertModal } from "Ducks/crm/lead";
import { getDealStage } from "Ducks/crm/crmField";

class ConvertLeadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dealDetails: { name: "", closingDate: "", amount: "", stageId: "" },
      accountToLink: null,
      newDeal: false
    };
    this.handleNewDeal = this.handleNewDeal.bind(this);
    this.handleConvertForm = this.handleConvertForm.bind(this);
    this.convertLead = this.convertLead.bind(this);
    this.handleAccountSelect = this.handleAccountSelect.bind(this);
  }
  componentDidMount() {
    this.props.getDealStage();
  }

  handleNewDeal() {
    this.setState({ newDeal: !this.state.newDeal });
  }

  handleConvertForm(field, value) {
    this.setState({
      ...this.state,
      dealDetails: { ...this.state.dealDetails, [field]: value }
    });
  }

  convertLead(id) {
    const deal = this.state.newDeal ? this.state.dealDetails : {};
    this.props.convertLead(id, deal, this.state.accountToLink);
  }

  handleAccountSelect(event) {
    this.setState({ ...this.state, accountToLink: event.target.value });
  }

  isDisabled(dealDetails) {
    if (!this.state.newDeal) {
      return false;
    } else {
      if (
        dealDetails.amount &&
        dealDetails.name &&
        dealDetails.closingDate &&
        dealDetails.stageId
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  render() {
    const { lead } = this.props.leadToView;
    const { loading, show, data, count } = this.props.leadToConvert.modal;
    const { dealStage } = this.props;
    const { dealDetails } = this.state;
    return (
      <FullScreenDialog
        show={show}
        handleHide={this.props.handleConvertModal}
        title={`Convert Lead (${lead.name}, ${lead.companyName})`}
      >
        {loading && <RctSectionLoader />}
        <DialogContent className="p-30">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <AccountSelection
                name={lead.name}
                companyName={lead.companyName}
                count={count}
                data={data}
                handleChange={this.handleAccountSelect}
                accountToLink={this.state.accountToLink}
              />

              <div className="mt-30">
                <div className="mb-20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.newDeal}
                        onChange={this.handleNewDeal}
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                      />
                    }
                    label={<p className="mb-0">Create new deal</p>}
                  />
                  {this.state.newDeal && (
                    <div className="row justify-content-center">
                      <div className="col-7">
                        <ConvertLeadForm
                          handleChange={this.handleConvertForm}
                          dealStage={dealStage}
                          dealDetails={dealDetails}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <DialogActions className="mx-0 mt-30 p-0">
                  <Button onClick={this.props.handleConvertModal}>Close</Button>
                  <Button
                    variant="contained"
                    onClick={() => this.convertLead(lead.id)}
                    className="ml-20 btn-success text-white"
                    disabled={this.isDisabled(dealDetails)}
                  >
                    Convert
                  </Button>
                </DialogActions>
              </div>
            </div>
          </div>
        </DialogContent>
      </FullScreenDialog>
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { leadState, crmField } = crmState;
  // leadToConvert
  const { leadToConvert, leadToView } = leadState;
  // crm fields
  const { dealStage } = crmField;
  return { leadToConvert, leadToView, dealStage };
};

export default connect(
  mapStateToProps,
  { convertLead, handleConvertModal, getDealStage }
)(ConvertLeadModal);
