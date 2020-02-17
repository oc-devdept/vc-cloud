import React from "react";
import { connect } from "react-redux";

// comments widget
import Comments from "Components/Widgets/Comments";
import RecentFollowUps from "../../../components/FollowUp/Widget/RecentFollowUps";

import { addNoteCustomer } from "Ducks/crm/customer";

function CustomerOverviewTab(props) {
  const { cust } = props;
  console.log(cust.followUps);
  function addNote(note) {
    props.addNoteCustomer(cust.id, note);
  }
  return (
    <React.Fragment>
      <div
        className="todo-dashboard"
        style={{
          border: "1px solid black",
          borderStyle: "dashed",
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          flex: 1
        }}
      >
        <div>last check for maintenance: date</div>
        <div>next check for maintenance: date</div>

        <div>Car Profile: </div>

        <div>detail of last appointment: Object</div>
        <div>Number of pending booking: Number</div>

        <div>Pending Transaction?</div>
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
