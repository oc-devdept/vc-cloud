import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import AddUserForm from "../forms/AddUserForm";

function AddUserDialog(props) {
  const { show, handleHide, toEdit, listOptions } = props;
  return (
    <DialogRoot show={show} handleHide={handleHide} size="md">
      <div className="p-20 pb-0">
        <AddUserForm toEdit={toEdit} listOptions={listOptions} />
      </div>
    </DialogRoot>
  );
}

export default connectModal({ name: "add_user_form" })(AddUserDialog);

