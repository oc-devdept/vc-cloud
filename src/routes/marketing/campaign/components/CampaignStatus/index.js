import React from "react";
import BgCard from "Components/BgCard";

// Chart
import RecipientChart from "../CampaignReports/RecipientChart";
import EngagementChart from "../CampaignReports/EngagementChart";

function getPercentage(x, y) {
  var percentage = (x / y) * 100;
  return percentage.toFixed(2);
}

function CampaignStatus(props) {
  const { campaignStat } = props.data;
  // recipients
  var recipients = campaignStat.sent;
  // delivered
  var delivered = campaignStat.delivered;
  var deliveredPer = getPercentage(delivered, recipients);
  // soft bounce
  var softBounce = campaignStat.softBounces;
  var softBouncePer = getPercentage(softBounce, recipients);

  //opens
  var opened = campaignStat.viewed;
  var openedPer = getPercentage(opened, delivered);

  var clicks = campaignStat.clickers;
  var clicksPer = getPercentage(clicks, delivered);

  var unsub = campaignStat.unsubscriptions;
  var unsubPer = getPercentage(unsub, delivered);

  var clickedArray = campaignStat.clickedArray;
  var viewedArray = campaignStat.viewedArray;

  const deliveries = [
    { label: "Delivered", field: delivered, small: deliveredPer },
    {
      label: "Bounced",
      field: softBounce,
      small: softBouncePer,
    },
  ];

  const engagements = [
    {
      label: "Views",
      field: opened,
      small: openedPer,
    },
    {
      label: "Clicks",
      field: clicks,
      small: clicksPer,
    },
    {
      label: "Unsubscribed",
      field: unsub,
      small: unsubPer,
    },
  ];

  return (
    <BgCard heading="Campaign Status">
    <div className="row">
      <div className="col-md-6 h-65">
        <RecipientChart stats={deliveries} />
      </div>
      <div className="col-md-6">
        <EngagementChart
          stats={engagements}
          clickedArray={clickedArray}
          viewedArray={viewedArray}
        />
      </div>
    </div>
  </BgCard>
  );
}

export default CampaignStatus;
