import React from "react";
// Deal history widget
import DealHistory from "../../components/DealHistory";

function DealHistoryTab(props) {
  const { history } = props;
  return (
    <div className="row">
      <div className="col-lg-12">
        <DealHistory history={history} />
      </div>
    </div>
  );
}

export default DealHistoryTab;
