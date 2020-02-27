import React from "react";
import { Wrapper, Contact, KeyDetails } from "Components/Layout/ProfileCard";
import { EventOutlined } from "@material-ui/icons";
import ShowUpcoming from "../../components/ShowUpcomingEvents";

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
      <div className="profile-card-section">
        <div className="profile-heading">
          <EventOutlined />
          Upcoming Events
        </div>
        <ShowUpcoming events={cust.events} />
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
        <button className="btn btn-primary" style={{color:'white'}} onClick={() => _handleDeployAgent(cust.id)}>
          Make yourself the agent for this customer
        </button>
      )}
    </Wrapper>
  );
}

export default CustomerCard;
