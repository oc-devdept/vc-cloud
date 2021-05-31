import React from "react";
import { withRouter } from "react-router-dom";
import { Wrapper, Contact, KeyDetails } from "Components/Layout/ProfileCard";
import { getDateTime } from "Helpers/helpers";

function CampaignCard(props){
    const { campaign } = props;   
    return (
        <Wrapper>
             <h1>{campaign.name}</h1>
            
        <KeyDetails
        keyDetails={[
        { label: "Subject", value: campaign.subject },
        { label: "Sender Name", value: campaign.senderName },
    { label: "Sender Email", value: campaign.senderEmail },
    { label: "Scheduled At", value: getDateTime(campaign.scheduledAt) },
          {
            label: "Owner",
            value: campaign.userInfo && campaign.userInfo.name
          }
        ]}
      />
      </Wrapper>
    )
}

export default withRouter(CampaignCard);