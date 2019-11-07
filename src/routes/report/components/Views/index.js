import React from "react";
import { ReportDefaultMessage } from "../DefaultMessages";

// Report Components

// Deal Reports
import DealsByOwnerReport from "./DealReports/DealsByOwnerReport";
import DealsByTypeReport from "./DealReports/DealsByTypeReport";
import DealsPipelineReport from "./DealReports/DealsPipelineReport";

// Closed Deal Reports
import WonByOwnerReport from "./ClosedDealReports/WonByOwnerReport";

// Lead Reports
import LeadsByStatusReport from "./LeadReports/LeadsByStatusReport";
import LeadsByOwnerReport from "./LeadReports/LeadsByOwnerReport";
import LeadsBySourceReport from "./LeadReports/LeadsBySourceReport";

// Acct Cust Reports
import TopSpenderAccountReport from "./AcctCustReports/TopSpenderAccountReport";
import TopSpenderCustomerReport from "./AcctCustReports/TopSpenderCustomerReport";

// Individual Report
import IndividualReport from "./IndividualReport";

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
    // Lead Reports
    //===================
    case "leadsByStatus":
      return <LeadsByStatusReport />;
    case "leadsByOwner":
      return <LeadsByOwnerReport />;
    case "leadsBySource":
      return <LeadsBySourceReport />;

    //===================
    // Acct Cust Reports
    //===================
    case "topSpenderAccount":
      return <TopSpenderAccountReport />;
    case "topSpenderCustomer":
      return <TopSpenderCustomerReport />;

    //===================
    // Individual Reports
    //===================
    case "individual":
      return <IndividualReport />;
    default:
      return <ReportDefaultMessage />;
  }
};

export default ReportRender;
