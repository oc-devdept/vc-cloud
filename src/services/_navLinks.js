// crm routes
import {
  customerListPage,
  accountListPage,
  dealListPage
} from "Helpers/crmURL";

import {
  bannerListPage,
  featuredListPage,
  carPage,
  blogPage
} from "Helpers/cmsURL";

// // acct routes
// import {
//   quoteListPage,
//   invoiceListPage,
//   crednoteListPage,
//   paymentPage
// } from "Helpers/accountingURL";

import { rentalListPage, rentalCarPage } from "Helpers/rentalURL";

import { allCarsPage, allPreownedCarsPage, configurePage } from "Helpers/inventoryURL";

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
      {
        title: "sidebar.customers",
        path: customerListPage
      },
      // {
      //   title: "sidebar.accounts",
      //   path: accountListPage
      // },
      {
        title: "sidebar.deals",
        path: dealListPage
      }
    ]
  },
  {
    url: "/app/cms/featured",
    baseUrl: "/app/cms",
    name: "CMS",
    child_routes: [
      {
        title: "sidebar.banners",
        path: bannerListPage
      },
      {
        title: "sidebar.featured",
        path: featuredListPage
      },
      {
        title: "sidebar.car",
        path: carPage
      },
      {
        title: "sidebar.blog",
        path: blogPage
      },
    ]
  },
  {
    url: "/app/rental/list",
    baseUrl: "/app/rental",
    name: "Rental",
    child_routes: [
      {
        title: "sidebar.rentalList",
        path: rentalListPage
      },
      {
        title: "sidebar.rentalCars",
        path: rentalCarPage
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
        title: "sidebar.allPreownedCars",
        path: allPreownedCarsPage
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
