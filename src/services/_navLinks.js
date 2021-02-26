// crm routes
import {
  customerListPage,
  accountListPage,
  dealListPage,
  paymentListPage,
  configListPage
} from "Helpers/crmURL";

import {
  bannerListPage,
  featuredListPage,
  carPage,
  blogPage,
  configPage,
  footerPage,
  grapeJsPage
} from "Helpers/cmsURL";

// acct routes
// import {
//   quoteListPage,
//   invoiceListPage,
//   crednoteListPage,
//   paymentPage
// } from "Helpers/accountingURL";

import { rentalListPage, rentalCarPage, rentalSettingsPage } from "Helpers/rentalURL";

import { allCarsPage, allPreownedCarsPage, configurePage } from "Helpers/inventoryURL";
import { accessControlHelper } from "Helpers/accessControlHelper";

import {
  marketingListPage,
  campaignPage,
  marketingTemplatePage
} from "Helpers/marketingURL";

export default function navLinks() {
  var links = [
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
      {
        title: "sidebar.accounts",
        path: accountListPage
      },
      {
        title: "sidebar.deals",
        path: dealListPage
      },
      {
        title: "sidebar.carconfig",
        path: configListPage
      },
      {
        title: "sidebar.payment",
        path: paymentListPage
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
        title: "sidebar.configOption",
        path: configPage
      },
      {
        title: "sidebar.blog",
        path: blogPage
      },
      {
        title: "sidebar.footer",
        path: footerPage
      },
      {
        title: "grapejs",
        path: grapeJsPage
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
      },
      {
        title: "sidebar.settings",
        path: rentalSettingsPage
      }
    ]
  },
  // {
  //   url: "/app/acct/quotations",
  //   baseUrl: "/app/acct",
  //   name: "Accounting",
  //   child_routes: [
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
  }  
];
  if(accessControlHelper(["campaign:read"])){
    links.push({
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
    });
  }

  links.push({
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  });

  return links;
}
