import React from "react";

const DealStageContent = ({ activeStep, dealStage }) => {
  return (
    <div>
      <h4 className="pb-10 text-muted">Key Notes</h4>
      <p className="fs-14" style={{ minHeight: "3rem" }}>
        {dealStage[activeStep] && dealStage[activeStep].description}
      </p>
    </div>
  );
};

export default DealStageContent;
