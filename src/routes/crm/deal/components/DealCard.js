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

function DealCard(props) {
  const { deal } = props;
  return (
    <Wrapper>
      <Contact
        noAvatar
        name={deal.name}
        subHeading={
          <NumberFormat
            value={deal.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        }
        indicator={deal.stageInfo}
      />
      <div className="profile-card-section">
        <div className="profile-heading">
          <PeopleOutline />
          Related Contacts
        </div>
        <Info
          title={deal.accountInfo.name}
          subtitle="Account"
          onClick={() => props.history.push(singleAccount(deal.accountInfo.id))}
          button
        />
        {deal.customerInfo && (
          <Info
            title={deal.customerInfo.name}
            subtitle="Customer"
            onClick={() =>
              props.history.push(singleCustomer(deal.customerInfo.id))
            }
            button
          />
        )}
      </div>
      <KeyDetails
        keyDetails={[
          {
            label: "Chance",
            value: deal.stageInfo.chance
          },
          {
            label: "Owner",
            value: deal.userInfo && deal.userInfo.name
          }
        ]}
      />
    </Wrapper>
  );
}

export default withRouter(DealCard);
