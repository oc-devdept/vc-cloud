import React from "react";
import BgCard from "Components/BgCard";

// Chart
import RecipientChart from "../CampaignReports/RecipientChart";

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
  var softBouncePer = getPercentage(softBounce, delivered);
  // hard bounce
  var hardBounce = campaignStat.hardBounces;
  var hardBouncePer = getPercentage(hardBounce, delivered);

  const status = [
    { label: "Recipients", field: recipients },
    { label: "Delivered", field: delivered, small: deliveredPer },
    {
      label: "Soft Bounced",
      field: softBounce,
      small: softBouncePer
    },
    {
      label: "Hard Bounced",
      field: hardBounce,
      small: hardBouncePer
    }
  ];

  return (
    <BgCard heading="Campaign Status">
      <div className="row">
        <div className="col-md-6">
          <RecipientChart />
        </div>
        <div className="col-md-6">
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
                {key % 2 == true && <div className="w-100"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </BgCard>
  );
}

export default CampaignStatus;
