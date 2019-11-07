import React from "react";
import { Link } from "react-router-dom";
import {
  Wrapper,
  Contact,
  KeyDetails
} from "Components/Layout/ProfileCard";
import { EventOutlined } from "@material-ui/icons";
import { singleAccount } from "Helpers/crmURL";

import ShowUpcoming from "../../components/ShowUpcomingEvents";

function CustomerCard(props) {
  const { cust } = props;
  return (
    <Wrapper>
      <Contact
        name={cust.name}
        call={cust.baseContact.mobile}
        email={cust.baseContact.email}
        website={cust.baseContact.website}
        indicator={
          cust.isActive
            ? { classes: "border-success text-success", name: "Active" }
            : { classes: "border-danger text-danger", name: "Inactive" }
        }
      />
      <div className="profile-card-section">
        <div className="profile-heading">
          <EventOutlined />
          Upcoming Events
        </div>
        <ShowUpcoming events={cust.events} />
        {/* {showEvents(cust.events)} */}
      </div>
      <KeyDetails
        keyDetails={[
          {
            label: "Account",
            value: cust.accountId && (
              <Link to={singleAccount(cust.accountInfo.id)}>
                {cust.accountInfo.name}
              </Link>
            )
          },
          {
            label: "Owner",
            value: cust.userInfo && cust.userInfo.name
          }
        ]}
      />
    </Wrapper>
  );
}

export default CustomerCard;
