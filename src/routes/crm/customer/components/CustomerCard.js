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
  const { cust, _handleDeployAgent } = props;

  return (
    <Wrapper>
      <Contact
        name={cust.name}
        call={cust.contact}
        email={cust.email}
        indicator={
          cust.isActive
            ? { classes: "border-success text-success", name: "Active" }
            : { classes: "border-danger text-danger", name: "Inactive" }
        }
      />
      <div className="profile-card-section">
        {/* <div className="profile-heading">
          <EventOutlined />
          Upcoming Events
        </div> */}
        {/* <ShowUpcoming events={cust.events} /> */}
        {/* {showEvents(cust.events)} */}
      </div>
      <KeyDetails
        keyDetails={[
          {
            label: "Owner",
            // value: cust.userInfo && cust.userInfo.name
            value: cust.userInfo? cust.userInfo.name : 'Waiting For Agent'
          }
        ]}
      />

      {!cust.userInfo && 
        <button onClick={() => _handleDeployAgent(cust.id)}>
          Pick up the Orphan
        </button>
      }
  
    </Wrapper>
  );
}

export default CustomerCard;
