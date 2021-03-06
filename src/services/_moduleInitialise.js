/**
 * Initialise Modules
 */

import HomebaseComponent from "Routes/homebase/AsyncRoutes";
import CalendarComponent from "Routes/calendar/AsyncRoutes";
import ReportComponent from "Routes/report/AsyncRoutes";

import crm from "Routes/crm";
import cms from "Routes/cms";
// import Accounting from "Routes/accounting";
import Setting from "Routes/setting";
import Marketing from "Routes/marketing";
import InventoryComponent from "Routes/inventory";
import Rental from "Routes/rental";

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
    path: "cms",
    component: cms
  },
  // {
  //   path: "acct",
  //   component: Accounting
  // },
  {
    path: "reports",
    component: ReportComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "settings",
    component: Setting
  },
  {
    path: "marketing",
    component: Marketing
  },
  {
    path: "rental",
    component: Rental
  }
];
