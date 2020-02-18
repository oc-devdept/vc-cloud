import React from "react";
import Chip from "@material-ui/core/Chip";

function CampaignStatusLabel(props) {
  const { sentOn } = props;
  let label = "Pending";
  let classes;
  if (sentOn) {
    classes = "border-success text-success";
    label = "Sent";
  }
  return (
    <Chip size="small" className={classes} label={label} variant="outlined" />
  );
}

export default CampaignStatusLabel;
