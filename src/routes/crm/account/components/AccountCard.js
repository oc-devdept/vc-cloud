import React from "react";
import {
  Wrapper,
  Contact,
  KeyDetails
} from "Components/Layout/ProfileCard";
import { EventOutlined } from "@material-ui/icons";

import ShowUpcoming from "../../components/ShowUpcomingEvents";

function AccountCard(props) {
  const { acct } = props;

  return (
    <Wrapper>
      <Contact
        name={acct.name}
        call={acct.baseContact.phone}
        email={acct.baseContact.email}
        website={acct.baseContact.website}
        indicator={
          acct.isActive
            ? { classes: "border-success text-success", name: "Active" }
            : { classes: "border-danger text-danger", name: "Inactive" }
        }
      />
      <div className="profile-card-section">
        <div className="profile-heading">
          <EventOutlined />
          Upcoming Events
        </div>
        <ShowUpcoming events={acct.events} />
      </div>
      <KeyDetails
        keyDetails={[
          { label: "Industry", value: acct.industryInfo },
          {
            label: "Owner",
            value: acct.userInfo && acct.userInfo.name
          }
        ]}
      />
    </Wrapper>
  );
}

export default AccountCard;
