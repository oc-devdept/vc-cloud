export const contactColumns = [
  {
    label: "disable",
    name: "disable",
    options: {
      display: false,
      filter: false,
      search: false,
      sort: false,
      viewColumns: false
    }
  },
  { label: "Name", name: "name", options: { filter: false } },
  // { label: "Company", name: "companyName" },
  {
    label: "Account",
    name: "accountInfo",
    options: { customBodyRender: value => (value ? value.name : "") }
  },
  { label: "Email", name: "email" },
  {
    label: "Status",
    name: "statusInfo",
    options: {
      display: false,
      customBodyRender: value => (value ? value.name : "")
    }
  },
  { label: "Source", name: "source", options: { display: false } },
  { label: "Interest", name: "interest", options: { display: false } },
  { label: "Industry", name: "industry", options: { display: false } }
];

export const mailingColumns = [
  { label: "Name", name: "name", options: { filter: false } },
  { label: "Email", name: "email" }
];
