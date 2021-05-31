import React, { Component } from "react";
import Helmet from "Components/Helmet";
import { connect } from "react-redux";
import moment from "moment";

// Success dialog
import SuccessDialog from "./SuccessDialog";

// Stepper
import { ArrowBack } from "@material-ui/icons";
import { Stepper, Step, StepLabel, Button, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// form components
import SetupForm from "./Setup";
import TemplateForm from "./Template";
import MailingListForm from "./MailingList";
import SummaryForm from "./Summary";

// Actions
import { newCampaign } from "Ducks/marketing/campaign";

const styles = {
  root: {
    background: "none",
    border: "none",
  },
};

function toNearest30min() {
  const start = moment();
  const remainder = 30 - (start.minute() % 30);
  const dateTime = moment(start).add(remainder, "minutes").toDate();
  return dateTime;
}

class marketing_campaign_new extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      campaignForm: {
        setup: {
          name: "",
          subject: "",
          senderName: this.props.loggedInUser.name,
          senderEmail: this.props.loggedInUser.email,
          replyTo: "",
          toField: "",
        },
        template: {
          templateId: "",
          htmlContent: "",
        },
        mailingList: [],
        scheduledAt: toNearest30min(),
        sendNow: false,
      },
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.goToStep = this.goToStep.bind(this);
    this.onSetupChange = this.onSetupChange.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onMailingListChange = this.onMailingListChange.bind(this);
    this.onSummaryChange = this.onSummaryChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedInUser != prevProps.loggedInUser) {
      this.setState({
        campaignForm: {
          ...prevState.campaignForm,
          setup: {
            ...prevState.campaignForm.setup,
            senderEmail: this.props.loggedInUser.email,
            senderName: this.props.loggedInUser.name,
          },
        },
      });
    }
  }

  /**
   * Stepper Functions
   */
  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };
  goToStep(step) {
    this.setState({ activeStep: step });
  }

  /**
   * Form Functions
   */
  onSetupChange(field, val) {
    this.setState({
      campaignForm: {
        ...this.state.campaignForm,
        setup: { ...this.state.campaignForm.setup, [field]: val },
      },
    });
  }
  //CHNAGED FROM HUTTONS
  // onTemplateChange(field, val) {
  //   this.setState({
  //     campaignForm: {
  //       ...this.state.campaignForm,
  //       template: { ...this.state.campaignForm.template, [field]: val }
  //     }
  //   });
  // }
  //TEMPLATE = HTML CONTENT
  onTemplateChange(template, design, html) {
    this.setState({
      campaignForm: {
        ...this.state.campaignForm,
        template: {
          ...this.state.campaignForm.template,
          htmlContent: template.html,
          templateId: template.id,
        },
      },
    });
  }
  onMailingListChange(val) {
    this.setState({
      campaignForm: {
        ...this.state.campaignForm,
        mailingList: [val],
      },
    });
  }
  onSummaryChange(field, val) {
    let changeDateTime = this.state.campaignForm.scheduledAt;
    if (val) {
      changeDateTime = toNearest30min();
    
    }
    let campaignVals = { ...this.state.campaignForm};
    campaignVals.scheduledAt = changeDateTime;
    if(field == "trigger"){
      campaignVals.sendNow = false;
      campaignVals.trigger = true;
    }
    else if(field == "sendNow"){
      campaignVals.trigger = false;
      campaignVals.sendNow = val;
    }
    else {
      campaignVals[field] = val;
    }
    
    this.setState({
      campaignForm: campaignVals,
    });
  }

  renderForm() {
    return [
      {
        label: "Setup",
        component: <SetupForm onChange={this.onSetupChange} data={this.state.campaignForm.setup} />,
      },
      {
        label: "Template",
        component: <TemplateForm onChange={this.onTemplateChange} data={this.state.campaignForm.template} />,
      },
      {
        label: "Mailing List",
        component: <MailingListForm onChange={this.onMailingListChange} data={this.state.campaignForm.mailingList} />,
      },
      {
        label: "Summary",
        component: <SummaryForm onChange={this.onSummaryChange} data={this.state.campaignForm} goToStep={this.goToStep} />,
      },
    ];
  }

  /**
   * Submit form
   */
  handleSubmit() {
    const { setup, template, trigger, ...others } = this.state.campaignForm;
    this.props.newCampaign({
      ...setup,
      ...template,
      ...others,
    });
  }

  render() {
    const { activeStep } = this.state;
    const formComponents = this.renderForm();
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Helmet title="New Campaign" metaDesc="Marketing Campaigns Creation" />
        <div className="row align-items-center">
          <div className="col-md-4 text-left">
            <div className="d-flex align-items-center">
              <IconButton onClick={() => this.props.history.goBack()} disableRipple aria-label="back" className="back-button">
                <ArrowBack fontSize="small" style={{ color: "rgba(0, 0, 0, 0.54)" }} />
              </IconButton>
              <h3 className="mb-0 ml-10">{this.state.campaignForm.setup.name}</h3>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <Stepper className={classes.root} activeStep={activeStep}>
              {formComponents.map((formComp, key) => {
                // const stepProps = {};
                // console.log(formComp);
                // console.log(formComp.completed);
                // stepProps.completed = formComp.completed;
                return (
                  <Step key={key}>
                    <StepLabel>{formComp.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          <div className="col-md-4 text-right">
            <div>
              <Button className="mr-10" disabled={activeStep === 0} onClick={this.handleBack}>
                Back
              </Button>
              {activeStep === formComponents.length - 1 ? (
                <Button variant="contained" className="text-white" color="primary" onClick={this.handleSubmit}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" className="text-white" color="primary" onClick={this.handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 mt-30">{formComponents[activeStep].component}</div>
        </div>
        <SuccessDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { loggedInUser };
};

export default withStyles(styles)(connect(mapStateToProps, { newCampaign })(marketing_campaign_new));
