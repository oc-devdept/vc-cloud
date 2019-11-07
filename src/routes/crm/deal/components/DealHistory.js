import React from "react";
import BgCard from "Components/BgCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { getTheDate } from "Helpers/helpers";

const DealHistory = ({ history }) => {
  return (
    <BgCard fullBlock heading="Deal History">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stage</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Probability</TableCell>
            <TableCell>Closing Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Modified Time</TableCell>
            <TableCell>Modified By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((his, key) => {
              return (
                <TableRow className="border-bottom-0" key={key} hover>
                  <TableCell>{his.stageName}</TableCell>
                  <TableCell>{his.amount}</TableCell>
                  <TableCell>{his.chance}</TableCell>
                  <TableCell>{getTheDate(his.closingDate)}</TableCell>
                  <TableCell>{his.duration}</TableCell>
                  <TableCell>{getTheDate(his.createdAt)}</TableCell>
                  <TableCell>{his.userInfo && his.userInfo.name}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="border-bottom-0 text-center" colSpan={7}>
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </BgCard>
  );
};

export default DealHistory;
