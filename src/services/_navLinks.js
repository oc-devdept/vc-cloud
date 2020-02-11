// crm routes
import {
  leadListPage,
  customerListPage,
  accountListPage,
  dealListPage,
  marketingListPage
} from "Helpers/crmURL";

// acct routes
import {
  quoteListPage,
  invoiceListPage,
  crednoteListPage,
  paymentPage
} from "Helpers/accountingURL";

import {
  inventoryPage,
  allCarsPage,
  configurePage,
  bookingSystemPage
} from "Helpers/inventoryURL";

import { marketingPage, mailPage, analyticsPage } from "Helpers/marketingURL";

export default [
  {
    url: "/app/homebase",
    baseUrl: "/app/homebase",
    name: "HomeBase",
    child_routes: []
  },
  {
    url: "/app/calendar",
    baseUrl: "/app/calendar",
    name: "Calendar",
    child_routes: []
  },
  {
    url: "/app/crm/customers",
    baseUrl: "/app/crm",
    name: "CRM",
    child_routes: [
      // {
      //   title: "sidebar.leads",
      //   path: leadListPage
      // },
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
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  },

  {
    url: "/app/inventory/dashboard",
    baseUrl: "/app/inventory",
    name: "Inventory",
    child_routes: [
      {
        title: "sidebar.dashboard",
        path: inventoryPage
      },
      {
        title: "sidebar.allCars",
        path: allCarsPage
      },
      {
        title: "sidebar.settings",
        path: configurePage
      },
      {
        title: "sidebar.booking",
        path: bookingSystemPage
      }
    ]
  },

  {
    url: "/app/marketing/dashboard",
    baseUrl: "/app/marketing",
    name: "Marketing",
    child_routes: [
      {
        title: "sidebar.dashboard",
        path: marketingPage
      },
      {
        title: "sidebar.sendmail",
        path: mailPage
      },
      {
        title: "sidebar.analytics",
        path: analyticsPage
      }
    ]
  }
];
