import React from "react";
import DealList from "../../../deal/components/DealList";

function CustomerDealsTab(props) {
  const { deals } = props;
  return (
    <div className="row">
      <div className="col">
        <DealList title="Related Deals" customerId={props.customerId} getAllDeal={props.getAllDeal} tableData={props.tableData} noRelated />
      </div>
    </div>
  );
}

export default CustomerDealsTab;
