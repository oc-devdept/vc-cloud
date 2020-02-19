import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SweetAlert from "react-bootstrap-sweetalert";

// Actions
import { closeCampaignSuccess } from "Ducks/marketing/campaign";

function CampaignSuccessDialog(props) {
  const { successDialog } = props;
  function handleClose() {
    props.history.push("/app/marketing/campaign");
    props.closeCampaignSuccess();
  }

  return (
    <SweetAlert
      success
      show={successDialog}
      title="Campaign Created!"
      btnSize="sm"
      onConfirm={handleClose}
      onCancel={handleClose}
      confirmBtnCssClass="btn-success text-white"
    ></SweetAlert>
  );
}
const mapStateToProps = ({ marketingState }) => {
  const { campaignState } = marketingState;
  const { campaignForm } = campaignState;
  const { successDialog } = campaignForm;
  return { successDialog };
};

export default withRouter(
  connect(mapStateToProps, { closeCampaignSuccess })(CampaignSuccessDialog)
);
