import React from "react";
import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";

import DealFormLayout from "../../components/Layout/DealFormLayout";
import { getTheDate } from "Helpers/helpers";

function DetailsTab(props) {
  const { deal } = props;

  const fields = {
    name: <EditableInput label="Name" value={deal.name} />,
    amount: <EditableInput label="Amount" amount value={deal.amount} />,
    closingDate: (
      <EditableInput
        label="Closed On"
        value={deal.closingDate && getTheDate(deal.closingDate)}
      />
    ),
    owner: (
      <EditableInput
        label="Owner"
        value={deal.userInfo && deal.userInfo.name}
      />
    ),
    stage: <EditableInput label="Stage" value={deal.stageInfo.name} />,
    source: <EditableInput label="Source" value={deal.sourceInfo} />,
    type: <EditableInput label="Type" value={deal.typeInfo} />,
    customer: (
      <EditableInput
        label="Customer"
        value={deal.customerInfo && deal.customerInfo.name}
      />
    ),
    account: (
      <EditableInput
        label="Account"
        value={deal.accountInfo && deal.accountInfo.name}
      />
    ),
    description: <EditableInput label="Description" value={deal.info} />
  };

  return (
    <BgCard fullBlock>
      <DealFormLayout {...fields} />
    </BgCard>
  );
}

export default DetailsTab;
