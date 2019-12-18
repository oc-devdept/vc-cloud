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

function QuotationCard(props) {

  const { quotation } = props;

  return (
    <Wrapper>
      <Contact
        noAvatar
        name={`All Cars`}
        subHeading={`Edit your cars' details, options and variation`}
        // indicator={quotation.latest}
      />
      {/* <div className="d-flex flex-column">
        <div>{`State: ${quotation.state}`}</div>
      </div> */}

      {/* <KeyDetails
        keyDetails={[
          {
            label: "Client",
            value: '123'
          },
          {
            label: "Owner",
            value: '123'
          },
          {
            label: "State",
            value: '312'
          }
        ]}
      /> */}
    </Wrapper>
  );
}

export default QuotationCard;
