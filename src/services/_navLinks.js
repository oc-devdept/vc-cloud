// crm routes
import {
  customerListPage,
  accountListPage,
  dealListPage
} from "Helpers/crmURL";

// // acct routes
// import {
//   quoteListPage,
//   invoiceListPage,
//   crednoteListPage,
//   paymentPage
// } from "Helpers/accountingURL";

import { allCarsPage, configurePage } from "Helpers/inventoryURL";

import {
  marketingListPage,
  campaignPage,
  marketingTemplatePage
} from "Helpers/marketingURL";

export default [
  {
    url: "/app/homebase",
    baseUrl: "/app/homebase",
    name: "HomeBase",
    child_routes: []
  },
  // {
  //   url: "/app/calendar",
  //   baseUrl: "/app/calendar",
  //   name: "Calendar",
  //   child_routes: []
  // },
  {
    url: "/app/crm/customers",
    baseUrl: "/app/crm",
    name: "CRM",
    child_routes: [
      {
        title: "sidebar.customers",
        path: customerListPage
      },
      {
        title: "sidebar.accounts",
        path: accountListPage
      },
      {
        title: "sidebar.deals",
        path: dealListPage
      }
    ]
  },
  // {
  //   url: "/app/acct/quotations",
  //   baseUrl: "/app/acct",
  //   name: "Accounting",
  //   child_rouztes: [
  //     {
  //       title: "sidebar.quotations",
  //       path: quoteListPage
  //     },
  //     {
  //       title: "sidebar.invoices",
  //       path: invoiceListPage
  //     },
  //     {
  //       title: "sidebar.payment",
  //       path: paymentPage
  //     },
  //     {
  //       title: "sidebar.credit_note",
  //       path: crednoteListPage
  //     }
  //   ]
  // },

  {
    url: allCarsPage,
    baseUrl: "/app/inventory",
    name: "Inventory",
    child_routes: [
      {
        title: "sidebar.allCars",
        path: allCarsPage
      },
      {
        title: "sidebar.settings",
        path: configurePage
      }
    ]
  },

  {
    url: "/app/marketing/campaign",
    baseUrl: "/app/marketing",
    name: "Marketing",
    child_routes: [
      {
        title: "sidebar.campaign",
        path: campaignPage
      },
      {
        title: "sidebar.mailingList",
        path: marketingListPage
      },
      {
        title: "sidebar.template",
        path: marketingTemplatePage
      }
    ]
  },
  {
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  }
];
