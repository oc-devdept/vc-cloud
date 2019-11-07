import React from "react";
import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";

import { KeyInformation, DealInformation } from "../../components/form/Layout";
import { getTheDate } from "Helpers/helpers";

function DetailsTab(props) {
  const { deal } = props;
  return (
    <BgCard fullBlock>
      <KeyInformation
        fullWidth
        name={<EditableInput label="Name" value={deal.name} />}
        amount={<EditableInput label="Amount" amount value={deal.amount} />}
        closingDate={
          <EditableInput
            label="Closing Date"
            value={deal.closingDate && getTheDate(deal.closingDate)}
          />
        }
        owner={<EditableInput label="Owner" value={deal.userInfo.name} />}
        account={
          <EditableInput label="Account" value={deal.accountInfo.name} />
        }
        stage={<EditableInput label="Stage" value={deal.stageInfo.name} />}
      />
      <hr />
      <DealInformation
        fullWidth
        source={<EditableInput label="Source" value={deal.sourceInfo} />}
        type={<EditableInput label="Type" value={deal.typeInfo} />}
        customer={
          <EditableInput
            label="Customer"
            value={deal.customerInfo && deal.customerInfo.name}
          />
        }
        description={<EditableInput label="Description" value={deal.info} />}
      />
    </BgCard>
  );
}

export default DetailsTab;
