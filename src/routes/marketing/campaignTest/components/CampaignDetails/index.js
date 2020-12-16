import React from "react";

import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";

import { getDateTime } from "Helpers/helpers";

import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

function getPercentage(x, y) {
  var percentage = 0;
  if (y > 0) {
    percentage = (x / y) * 100;
  }

  return percentage.toFixed(2);
}

function CampaignDetails(props) {
  const { data } = props;
  const { campaignStat } = data;
  campaignStat.openRate = getPercentage(
    campaignStat.viewed ? campaignStat.viewed : 0,
    campaignStat.delivered
  );
  campaignStat.clickRate = getPercentage(
    campaignStat.clickers,
    campaignStat.delivered
  );
  /*
  const mainDetails = [
    { label: "Subject", field: data.subject },
    { label: "Sender Name", field: data.senderName },
    { label: "Sender Email", field: data.senderEmail },
    // { label: "Reply To", field: data.replyTo },
    { label: "Scheduled At", field: getDateTime(data.scheduledAt) },
    {
      label: "Sent On",
      field: data.sentOn ? getDateTime(data.sentOn) : ""
    }
  ];
*/
  const leftDetails = [
    { label: "Recipients", field: "sent" },
    { label: "Open Rate (%)", field: "openRate" },
    { label: "Delivered", field: "delivered" },
    { label: "Views", field: "viewed" },
  ];

  const rightDetails = [
    { label: "Click Rate (%)", field: "clickRate" },
    { label: "Total Clicks", field: "clickers" },
    { label: "Unsubscribed", field: "unsubscriptions" },
  ];

  return (
    <BgCard heading="Campaign Details">
      <div className="row">
        <div className="col-md-6">
          <Table size="small">
            <TableBody>
              {leftDetails.map((detail, key) => (
                <TableRow key={key} className="border-bottom">
                  <TableCell
                    style={{ padding: "12px 24px 6px 6px" }}
                    align="left"
                  >
                    {detail.label}
                  </TableCell>
                  <TableCell align="right">
                    {campaignStat[detail.field]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="col-md-6">
          <Table size="small">
            <TableBody>
              {rightDetails.map((detail, key) => (
                <TableRow key={key} className="border-bottom">
                  <TableCell
                    style={{ padding: "12px 24px 6px 6px" }}
                    align="left"
                  >
                    {detail.label}
                  </TableCell>
                  <TableCell align="right">
                    {campaignStat[detail.field]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </BgCard>
  );
}

export default CampaignDetails;
