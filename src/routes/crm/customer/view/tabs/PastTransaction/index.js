import React from "react";
import BgCard from "Components/BgCard";

import TransactionList from "./TransactionList";

function PastTransaction(props) {
  const { transaction } = props;

  console.log(transaction);

  return (
    <div className="row">
      <div className="col-md-12">
        <BgCard fullBlock>
          <TransactionList title="All Transactions" tableData={transaction} />
        </BgCard>
      </div>
    </div>
  );
}

export default PastTransaction;
