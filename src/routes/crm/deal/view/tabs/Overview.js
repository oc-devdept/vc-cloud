import React from "react";
import { connect } from "react-redux";
// Deal Stage Widget
import SelectDealStage from "../../components/SelectDealStage";

// Deal Products Widget
import DealProducts from "../../components/DealProducts";

// Comment Widget
import Comments from "Components/Widgets/Comments";
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
        <div className="col-lg-12">
          <DealProducts products={deal.productInfo} />
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
    </React.Fragment>
  );
}

export default connect(null, { addNoteDeal })(OverviewTab);
