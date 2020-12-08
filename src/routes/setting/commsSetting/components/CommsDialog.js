import React from "react";
import { connectModal } from "redux-modal";

import DialogRoot from "Components/Dialog/DialogRoot";

import { InputLabel, FormControl } from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";

function CommsDialog(props) {
  const { show, handleHide, edit, action } = props;
  console.log(handleHide)
  const [state, setState] = React.useState({ name: "", commission: "" });

  React.useEffect(() => {
    if (edit) {
      setState(edit);
    }
  }, []);

  function saveComms(data) {
    action(data);
    handleHide();
  }

  return (
    <DialogRoot
      title="Commission Form"
      size="sm"
      show={show}
      handleHide={handleHide}
      dialogAction={() => saveComms(state)}
      dialogActionLabel="Save"
    >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <FormControl className="my-10">
            <InputLabel className="fw-bold" shrink>
              Name
            </InputLabel>
            <BaseInput
              value={state.name}
              onChange={e => setState({ ...state, name: e.target.value })}
            />
          </FormControl>
          <FormControl className="my-10">
            <InputLabel className="fw-bold" shrink>
              Commission
            </InputLabel>
            <BaseInput
              value={state.commission}
              onChange={e => setState({ ...state, commission: e.target.value })}
            />
          </FormControl>
        </div>
      </div>
    </DialogRoot>
  );
}

export default connectModal({ name: "comms_form" })(CommsDialog);
