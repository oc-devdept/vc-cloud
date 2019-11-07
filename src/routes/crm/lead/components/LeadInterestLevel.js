import React from "react";
import { Progress } from "reactstrap";

const LeadInterestLevel = ({ interest }) => {
  return <Progress value={interest} max={100} color="secondary" />;
};

export default LeadInterestLevel;
