import React from "react";
import { withRouter } from "react-router-dom";
import { PeopleOutline } from "@material-ui/icons";
import {
  Wrapper,
  Contact,
  Info,
  KeyDetails
} from "Components/Layout/ProfileCard";
import NumberFormat from "react-number-format";
import { singleAccount, singleCustomer } from "Helpers/crmURL";

function QuotationCard(props) {
  const { quotation } = props;

  return (
    <Wrapper>
      <Contact
        noAvatar
        name={`Quotation V${quotation.version}`}
        subHeading={`#${quotation.quoteID}`}
        // indicator={quotation.latest}
      />
      {/* <div className="d-flex flex-column">
        <div>{`State: ${quotation.state}`}</div>
      </div> */}

      <KeyDetails
        keyDetails={[
          {
            label: "Client",
            value: quotation.accountInfo && quotation.accountInfo.name
          },
          {
            label: "Owner",
            value: quotation.userInfo && quotation.userInfo.name
          },
          {
            label: "State",
            value: quotation.state
          }
        ]}
      />
    </Wrapper>
  );
}

export default QuotationCard;
