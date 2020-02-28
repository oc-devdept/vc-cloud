import React from "react";
import { ReportDefaultMessage } from "../DefaultMessages";

// Deal Reports
import DealsByOwnerReport from "./DealReports/DealsByOwnerReport";
import DealsByTypeReport from "./DealReports/DealsByTypeReport";
import DealsPipelineReport from "./DealReports/DealsPipelineReport";

// Closed Deal Reports
import WonByOwnerReport from "./ClosedDealReports/WonByOwnerReport";

// Acct Cust Reports
import TopSpenderAccountReport from "./AcctCustReports/TopSpenderAccountReport";
import TopSpenderCustomerReport from "./AcctCustReports/TopSpenderCustomerReport";

// Individual Report
import IndividualReport from "./IndividualReport";

// Sales Report
import CommissionReport from "./SalesReports/CommissionReport";

const ReportRender = ({ componentToRender }) => {
  switch (componentToRender) {
    //===================
    // Open Deal Reports
    //===================
    case "dealsByOwner":
      return <DealsByOwnerReport />;
    case "dealsByType":
      return <DealsByTypeReport />;
    case "dealsPipeline":
      return <DealsPipelineReport />;

    //===================
    // Closed Deal Reports
    //===================
    case "wonByOwner":
      return <WonByOwnerReport />;
    case "lostDealsReason":
      return <ReportDefaultMessage />;

    //===================
    // Acct Cust Reports
    //===================
    case "topSpenderAccount":
      return <TopSpenderAccountReport />;
    case "topSpenderCustomer":
      return <TopSpenderCustomerReport />;

    //===================
    // Customer Analysis
    //===================
    case "custDemographic":
      return <ReportDefaultMessage />;

    //===================
    // Individual Reports
    //===================
    case "topSeller":
      return <ReportDefaultMessage />;
    case "commission":
      return <CommissionReport />;
    case "individualReport":
      return <IndividualReport />;

    default:
      return <ReportDefaultMessage />;
  }
};

export default ReportRender;
