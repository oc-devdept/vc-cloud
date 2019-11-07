import React from "react";
import { connect } from "react-redux";

// comments widget
import Comments from "Components/Widgets/Comments";

// deals list
import DealList from "../../../deal/components/DealList";

import { addNoteCustomer } from "Ducks/crm/customer";

function CustomerOverviewTab(props) {
  const { cust } = props;
  function addNote(note) {
    props.addNoteCustomer(cust.id, note);
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6">
          <Comments comments={cust.notes} addComment={addNote} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <DealList title="Related Deals" tableData={cust.deals} noRelated />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(
  null,
  { addNoteCustomer }
)(CustomerOverviewTab);
