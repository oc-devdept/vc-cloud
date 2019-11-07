import React from "react";

import DialogRoot from "Components/Dialog/DialogRoot";
import UserControlForm from "../forms/UserControlForm";

const UserControlDialog = ({ handleClose, show, userToEdit }) => {
  function closeDialog() {
    handleClose("");
  }
  return (
    <DialogRoot
      show={show}
      handleHide={closeDialog}
      //size="md"
      title="User Control Settings"
    >
      <UserControlForm userToEdit={userToEdit} />
    </DialogRoot>
  );
};

export default UserControlDialog;
