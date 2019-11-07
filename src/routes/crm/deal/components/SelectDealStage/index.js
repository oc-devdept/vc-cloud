import React, { Component } from "react";
import { connect } from "react-redux";

//Components Req
import Button from "@material-ui/core/Button";
import RctSectionLoader from "Components/RctSectionLoader";
import DealStageStepper from "./Components/DealStageStepper";
import BgCard from "Components/BgCard";

//Page Req
import DealStageContent from "./Components/DealStageContent";

import {
  onClickStep,
  setCurrentStep,
  onChangeStepState,
  submitNewStage
} from "Ducks/crm/deal";
import { getDealStage } from "Ducks/crm/crmField";

class SelectDealStage extends Component {
  componentDidMount() {
    this.props.getDealStage();
    this.props.setCurrentStep(this.props.currentDeal.stageInfo.step);
  }

  isCurrentStep() {
    if (
      this.props.currentDeal.stageInfo.step ==
      this.props.dealStageStepper.activeStep
    ) {
      return true;
    } else {
      return false;
    }
  }

  getStageID = step => {
    const stage = this.props.dealStage.find(stage => {
      if (stage.step == step) return stage;
    });
    return stage.id;
  };

  handleComplete = () => {
    const step = this.props.dealStageStepper.activeStep;
    this.props.onChangeStepState();
    this.props.submitNewStage(this.props.currentDeal.id, this.getStageID(step));
  };

  isStepComplete(step) {
    return this.props.dealStageStepper.completed.has(step);
  }

  render() {
    const { activeStep, loading } = this.props.dealStageStepper;
    const { dealStage } = this.props;
    return (
      <BgCard customClasses="p-10" fullBlock>
        {loading && <RctSectionLoader />}
        <DealStageStepper
          dealStage={dealStage}
          activeStep={activeStep}
          isStepComplete={this.isStepComplete.bind(this)}
          onClickStep={this.props.onClickStep}
        />
        <div className="row justify-content-center align-items-stretch py-20">
          <div className="col-6">
            <DealStageContent activeStep={activeStep} dealStage={dealStage} />
          </div>
          <div className="col-3 justify-content-center align-self-center">
            {/* <div className="text-center"> */}
            <Button
              variant="outlined"
              color="primary"
              disabled={this.isCurrentStep()}
              onClick={this.handleComplete}
            >
              Update
            </Button>
            {/* </div> */}
          </div>
        </div>
      </BgCard>
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { dealState, crmField } = crmState;
  const { dealStageStepper } = dealState.dealToView;
  const { dealStage } = crmField;
  return { dealStageStepper, dealStage };
};

export default connect(
  mapStateToProps,
  {
    onClickStep,
    setCurrentStep,
    onChangeStepState,
    submitNewStage,
    getDealStage
  }
)(SelectDealStage);
