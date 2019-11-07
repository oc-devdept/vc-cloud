import React from "react";
import DialogRoot from "Components/Dialog/DialogRoot";

const NewRoleDialog = props => {
  const { show, handleHide } = props;
  return (
    <DialogRoot show={show} handleHide={handleHide} size="sm">
      new role form
    </DialogRoot>
  );
};

export default NewRoleDialog;
