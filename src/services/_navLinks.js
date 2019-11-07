// crm routes
import {
  leadListPage,
  customerListPage,
  accountListPage,
  dealListPage
} from "Helpers/crmURL";
// acct routes
import {
  quoteListPage,
  invoiceListPage,
  crednoteListPage,
  paymentPage
} from "Helpers/accountingURL";

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
    url: "/app/crm/leads",
    baseUrl: "/app/crm",
    name: "CRM",
    child_routes: [
      {
        title: "sidebar.leads",
        path: leadListPage
      },
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
  {
    url: "/app/acct/quotations",
    baseUrl: "/app/acct",
    name: "Accounting",
    child_routes: [
      {
        title: "sidebar.quotations",
        path: quoteListPage
      },
      {
        title: "sidebar.invoices",
        path: invoiceListPage
      },
      {
        title: "sidebar.payment",
        path: paymentPage
      },
      {
        title: "sidebar.credit_note",
        path: crednoteListPage
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
