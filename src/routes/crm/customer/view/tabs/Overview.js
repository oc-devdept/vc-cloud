import React from "react";
import { connect } from "react-redux";

// comments widget
import Comments from "Components/Widgets/Comments";
import RecentFollowUps from "../../../components/FollowUp/Widget/RecentFollowUps";
import RecentBookings from "../../components/RecentBookings";

import { addNoteCustomer } from "Ducks/crm/customer";

function CustomerOverviewTab(props) {
  const { cust } = props;
  function addNote(note) {
    props.addNoteCustomer(cust.id, note);
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <RecentBookings custId={cust.id} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <RecentFollowUps followUps={cust.followUps} />
        </div>
        <div className="col-lg-6">
          <Comments comments={cust.notes} addComment={addNote} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(null, { addNoteCustomer })(CustomerOverviewTab);
