import React from "react";
import { Wrapper, Contact, KeyDetails } from "Components/Layout/ProfileCard";
import { RecentActors } from "@material-ui/icons";
import ShowLatestFollowUps from "./ShowLatestFollowups";

import { Button } from "@material-ui/core";

function CustomerCard({ cust, _handleDeployAgent }) {
  const { name } = cust;
  const { email, phone, address } = cust.baseContact;

  return (
    <Wrapper>
      <Contact
        name={name}
        call={phone}
        email={email}
        address={address}
        indicator={
          cust.isActive
            ? { classes: "border-success text-success", name: "Active" }
            : { classes: "border-danger text-danger", name: "Inactive" }
        }
      />
      <i><h4>Subscribed</h4></i>
      <div className="profile-card-section">
        <div className="profile-heading">
          <RecentActors />
          Latest Follow Ups
        </div>
        <ShowLatestFollowUps followUps={cust.followUps} />
      </div>
      <KeyDetails
        keyDetails={[
          {
            label: "Owner",
            value: cust.userInfo ? cust.userInfo.name : "Waiting For Agent"
          }
        ]}
      />

      {!cust.userInfo && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="text-white"
          onClick={() => _handleDeployAgent(cust.id)}
        >
          Make yourself the agent for this customer
        </Button>
      )}
    </Wrapper>
  );
}

export default CustomerCard;
