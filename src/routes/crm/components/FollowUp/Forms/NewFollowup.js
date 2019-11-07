/**
 * New Follow up form
 * @param(FollowupType: Lead, Invoice)
 * @param(FollowupTypeId: LeadId, InvoiceId)
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

class NewFollowup extends Component {
  state = {};
  render() {
    const { show, handleHide } = this.props;
    return (
      <DialogRoot
        title="New Follow Up"
        size="sm"
        show={show}
        handleHide={handleHide}
        dialogActionLabel="Create"
        // dialogAction={this.onSubmit}
        close
      >
        hello
      </DialogRoot>
    );
  }
}

const mapStateToProps = ({ followupState }) => {
  const { followupResult, followupType } = followupState;
  return { followupResult, followupType };
};

export default connect(mapStateToProps)(
  connectModal({ name: "new_followup" })(NewFollowup)
);
