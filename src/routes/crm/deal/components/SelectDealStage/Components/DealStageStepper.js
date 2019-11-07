import React from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  StepConnector,
  StepLabel,
  Stepper,
  Step,
  StepButton
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const CustomLabel = withStyles({
  label: { color: "rgba(0, 0, 0, 0.35)" },
  active: {
    fontWeight: "700 !important"
  }
})(StepLabel);

const useQontoStepIconStyles = makeStyles(theme => ({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: theme.palette.primary.main
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 20
  }
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const DealStageStepper = ({
  dealStage,
  activeStep,
  isStepComplete,
  onClickStep
}) => {
  return (
    <Stepper
      alternativeLabel
      nonLinear
      activeStep={activeStep}
      connector={<QontoConnector />}
    >
      {dealStage.map((stage, index) => {
        return (
          <Step key={index}>
            <StepButton
              disableRipple
              onClick={() => onClickStep(index)}
              completed={isStepComplete(index)}
            >
              <CustomLabel StepIconComponent={QontoStepIcon}>{`${
                stage.name
              } - ${stage.chance}%`}</CustomLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default DealStageStepper;
