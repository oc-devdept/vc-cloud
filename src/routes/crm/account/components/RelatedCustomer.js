import React from "react";
import BgCard from "Components/BgCard";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { singleCustomer } from "Helpers/crmURL";
import ActiveStatusBadge from "Components/StatusBadge/ActiveStatusBadge";

const RelatedCustomer = ({ customers }) => {
  return (
    <BgCard fullBlock heading="Related Customers">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((cust, key) => {
              return (
                <TableRow className="border-bottom-0" key={key} hover>
                  <TableCell>
                    <Link to={singleCustomer(cust.id)}>{cust.name}</Link>
                  </TableCell>
                  <TableCell>{cust.baseContact.email}</TableCell>
                  <TableCell>{cust.baseContact.mobile}</TableCell>
                  <TableCell>{cust.baseContact.title}</TableCell>
                  <TableCell>
                    <ActiveStatusBadge isActive={cust.isActive} />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="border-bottom-0 text-center" colSpan={7}>
                No customer linked
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </BgCard>
  );
};

export default RelatedCustomer;
