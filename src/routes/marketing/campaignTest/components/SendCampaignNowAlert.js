import React from "react";
import { connectModal } from "redux-modal";
import SweetAlert from "react-bootstrap-sweetalert";

function SendCampaignNowAlert(props) {
  const { show, handleHide, name, sendNow } = props;
  function handleDelete() {
    sendNow();
    handleHide();
  }
  return (
    <SweetAlert
      info
      btnSize="sm"
      show={show}
      confirmBtnText="Send it now!"
      confirmBtnBsStyle="default"
      confirmBtnCssClass="text-info"
      title={`Send campaign "${name}" now?`}
      onConfirm={() => handleDelete()}
      onCancel={() => handleHide()}
    >
      <p>Do note that this action is irreversible.</p>
    </SweetAlert>
  );
}

export default connectModal({ name: "send_campaign_prompt" })(
  SendCampaignNowAlert
);
