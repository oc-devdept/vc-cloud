import React from "react";
import { Chip } from "@material-ui/core";

const StatusBadge = ({ name, color }) => {
  return (
    <Chip
      style={{ borderColor: color, color: color, fontSize: "12px" }}
      label={name}
      size="small"
      variant="outlined"
    />
  );
};

export default StatusBadge;
