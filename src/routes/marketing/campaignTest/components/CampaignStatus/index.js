import React from "react";
import BgCard from "Components/BgCard";

// Chart
import RecipientChart from "../CampaignReports/RecipientChart";
import EngagementChart from "../CampaignReports/EngagementChart";

function getPercentage(x, y) {
  var percentage = 0;
  if (y > 0) {
    percentage = (x / y) * 100;
  }

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
  const status = [
    { label: "Recipients", field: recipients },
    { label: "Delivered", field: delivered, small: deliveredPer },
    {
      label: "Bounced",
      field: softBounce,
      small: softBouncePer,
    },
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

  /*
<div className="col-md-4">
          <div className="row align-items-center">
            {status.map((stat, key) => (
              <React.Fragment key={key}>
                <div className="col">
                  <p className="mb-0">
                    {stat.field}{" "}
                    {stat.small && (
                      <small className="text-muted ml-10">{stat.small}%</small>
                    )}
                  </p>
                  <h3 className="fw-bold mb-10">{stat.label}</h3>
                </div>
                {key % 3 == true && <div className="w-60"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
  */
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
