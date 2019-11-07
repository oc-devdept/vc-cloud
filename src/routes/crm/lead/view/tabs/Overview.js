import React from "react";
import { connect } from "react-redux";
import BgCard from "Components/BgCard";

// Comments Widget
import Comments from "Components/Widgets/Comments";

import { addNoteLead } from "Ducks/crm/lead";

function LeadOverviewTab(props) {
  const { lead } = props;

  function addNote(note) {
    props.addNoteLead(lead.id, note);
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6">
          <Comments comments={lead.notes} addComment={addNote} />
        </div>
        <div className="col-lg-6">
          <BgCard>follow ups</BgCard>
        </div>
      </div>
    </React.Fragment>
  );
}
export default connect(
  null,
  { addNoteLead }
)(LeadOverviewTab);
