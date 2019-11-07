import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Lead Routes
 */
export const crm_lead_list = Loadable({
  loader: () => import("./lead"),
  loading: () => <RctPageLoader />
});
export const crm_single_lead = Loadable({
  loader: () => import("./lead/view"),
  loading: () => <RctPageLoader />
});
export const crm_new_lead = Loadable({
  loader: () => import("./lead/new"),
  loading: () => <RctPageLoader />
});
export const crm_edit_lead = Loadable({
  loader: () => import("./lead/edit"),
  loading: () => <RctPageLoader />
});
export const crm_import_lead = Loadable({
  loader: () => import("./lead/import"),
  loading: () => <RctPageLoader />
});

/**
 * Customer Routes
 */
export const crm_customer_list = Loadable({
  loader: () => import("./customer"),
  loading: () => <RctPageLoader />
});
export const crm_single_customer = Loadable({
  loader: () => import("./customer/view"),
  loading: () => <RctPageLoader />
});
export const crm_new_customer = Loadable({
  loader: () => import("./customer/new"),
  loading: () => <RctPageLoader />
});
export const crm_edit_customer = Loadable({
  loader: () => import("./customer/edit"),
  loading: () => <RctPageLoader />
});
export const crm_import_customer = Loadable({
  loader: () => import("./customer/import"),
  loading: () => <RctPageLoader />
});

/**
 * Account Routes
 */
export const crm_account_list = Loadable({
  loader: () => import("./account"),
  loading: () => <RctPageLoader />
});
export const crm_single_account = Loadable({
  loader: () => import("./account/view"),
  loading: () => <RctPageLoader />
});
export const crm_new_account = Loadable({
  loader: () => import("./account/new"),
  loading: () => <RctPageLoader />
});
export const crm_edit_account = Loadable({
  loader: () => import("./account/edit"),
  loading: () => <RctPageLoader />
});
export const crm_import_account = Loadable({
  loader: () => import("./account/import"),
  loading: () => <RctPageLoader />
});

/**
 * Deal Routes
 */
export const crm_deal_list = Loadable({
  loader: () => import("./deal"),
  loading: () => <RctPageLoader />
});
export const crm_single_deal = Loadable({
  loader: () => import("./deal/view"),
  loading: () => <RctPageLoader />
});
export const crm_new_deal = Loadable({
  loader: () => import("./deal/new"),
  loading: () => <RctPageLoader />
});
export const crm_edit_deal = Loadable({
  loader: () => import("./deal/edit"),
  loading: () => <RctPageLoader />
});
export const crm_import_deal = Loadable({
  loader: () => import("./deal/import"),
  loading: () => <RctPageLoader />
});
