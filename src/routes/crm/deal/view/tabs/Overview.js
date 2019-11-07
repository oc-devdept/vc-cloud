import React from "react";
import { connect } from "react-redux";
// import BgCard from "Components/BgCard";

// Deal Stage Widget
import SelectDealStage from "../../components/SelectDealStage";

// Comment Widget
import Comments from "Components/Widgets/Comments";

// Deal history widget
import DealHistory from "../../components/DealHistory";

import { addNoteDeal } from "Ducks/crm/deal";

function OverviewTab(props) {
  const { deal } = props;
  function addNote(note) {
    props.addNoteDeal(deal.id, note);
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <SelectDealStage deal={deal} currentDeal={deal} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Comments comments={deal.notes} addComment={addNote} />
        </div>
        {/* <div className="col">
          <BgCard>upcoming</BgCard>
        </div> */}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <DealHistory history={deal.history} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(
  null,
  { addNoteDeal }
)(OverviewTab);
