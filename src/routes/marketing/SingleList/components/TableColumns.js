import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';

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
  { label: "Email", name: "email", options: { filter: false } },
  { label: "Mobile", name: "mobile", options: { filter: false } },
  { label: "Company", name: "company", options: { filter: true } },
  { label: "Customer Type", name: "typeInfo", options: { filter: true}},
  { label: "DNC Status", name: "dnc_status", options: { filter: true}}, 
  { label: "Unsubscribed", name: "unsubscribed", 
    options: { display: false, filter: true,
      customBodyRender: value => {
        let checked = false;
        if(value == "true"){
          checked = true;
        }        
        return <Checkbox checked={checked} disabled />;
      }
    }
  }
];

export const mailingColumns = [
  { label: "Name", name: "name", options: { filter: false } },
  { label: "Email", name: "email",  options: { filter: false } },
  { label: "Company", name: "company",  options: { filter: false } }
];
