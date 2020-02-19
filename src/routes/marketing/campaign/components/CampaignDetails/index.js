import React from "react";

import BgCard from "Components/BgCard";
import EditableInput from "Components/Profile/Details/EditableInput";

import { getDateTime } from "Helpers/helpers";

import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

function CampaignDetails(props) {
  const { data } = props;
  const { campaignStat } = data;

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

  const leftDetails = [
    { label: "Open Rate (%)", field: "openRate" },
    { label: "Viewed", field: "viewed" },
    { label: "Total Opens", field: "clickers" },
    { label: "Unique Views", field: "uniqueViews" },
    { label: "Unsubscribed", field: "unsubscriptions" }
  ];

  const rightDetails = [
    { label: "Click Rate (%)", field: "clickRate" },
    { label: "Unique Click", field: "uniqueClicks" },
    { label: "Total Clicks", field: "clickers" }
  ];

  return (
    <BgCard heading="Campaign Details">
      <div className="row">
        <div className="col-md-4 border-right">
          {mainDetails.map((detail, key) => (
            <EditableInput
              label={detail.label}
              value={detail.field}
              key={key}
            />
          ))}
        </div>
        <div className="col-md-4">
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
        <div className="col-md-4">
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
