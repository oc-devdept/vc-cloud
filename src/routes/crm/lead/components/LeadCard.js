import React from "react";
import {
  Wrapper,
  Contact,
  KeyDetails
} from "Components/Layout/ProfileCard";

import LeadInterestLevel from "./LeadInterestLevel";

function LeadCard(props) {
  const { lead } = props;
  return (
    <Wrapper>
      <Contact
        name={lead.name}
        call={lead.baseContact.mobile}
        email={lead.baseContact.email}
        website={lead.baseContact.website}
        indicator={lead.statusInfo}
      />
      <div className="profile-card-section">
        <div>
          <h4 className="text-muted">Lead Interest</h4>
          <LeadInterestLevel interest={lead.interest} />
        </div>
      </div>
      <KeyDetails
        keyDetails={[
          {
            label: "Company",
            value: lead.companyName
          },
          {
            label: "Owner",
            value: lead.userInfo && lead.userInfo.name
          }
        ]}
      />
    </Wrapper>
  );
}

export default LeadCard;
