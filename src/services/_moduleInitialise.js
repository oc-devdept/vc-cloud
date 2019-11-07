/**
 * Initialise Modules
 */

import HomebaseComponent from "Routes/homebase/AsyncRoutes";
import CalendarComponent from "Routes/calendar/AsyncRoutes";
import ReportComponent from "Routes/report/AsyncRoutes";

import crm from "Routes/crm";
import Accounting from "Routes/accounting";
import Setting from "Routes/setting";

export default [
  {
    path: "homebase",
    component: HomebaseComponent
  },
  {
    path: "crm",
    component: crm
  },
  {
    path: "acct",
    component: Accounting
  },
  {
    path: "reports",
    component: ReportComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "settings",
    component: Setting
  }
];
