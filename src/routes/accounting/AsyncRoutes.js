import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// accounting management

export const acct_credit_note_component = Loadable({
  loader: () => import("./credit_note"),
  loading: () => <RctPageLoader />
});

export const acct_new_credit_note_component = Loadable({
  loader: () => import("./credit_note/new"),
  loading: () => <RctPageLoader />
});

export const view_credit_note = Loadable({
  loader: () => import("./credit_note/view"),
  loading: () => <RctPageLoader />
});

// accounting management new

export const acct_payment_component = Loadable({
  loader: () => import("./payment"),
  loading: () => <RctPageLoader />
});

export const view_payment = Loadable({
  loader: () => import("./payment/view"),
  loading: () => <RctPageLoader />
});

export const acct_new_payment_component = Loadable({
  loader: () => import("./payment/new"),
  loading: () => <RctPageLoader />
});

// invoice

export const acct_invoice_component = Loadable({
  loader: () => import("./invoice"),
  loading: () => <RctPageLoader />
});

export const acct_view_invoice = Loadable({
  loader: () => import("./invoice/view"),
  loading: () => <RctPageLoader />
});

export const acct_new_invoice_component = Loadable({
  loader: () => import("./invoice/new"),
  loading: () => <RctPageLoader />
});

export const acct_edit_invoice = Loadable({
  loader: () => import("./invoice/edit"),
  loading: () => <RctPageLoader />
});

// quotation
export const acct_quotation_component = Loadable({
  loader: () => import("./quotation"),
  loading: () => <RctPageLoader />
});

export const acct_new_quotation_component = Loadable({
  loader: () => import("./quotation/new"),
  loading: () => <RctPageLoader />
});

export const acct_edit_quotation = Loadable({
  loader: () => import("./quotation/edit"),
  loading: () => <RctPageLoader />
});

export const view_quotation = Loadable({
  loader: () => import("./quotation/view"),
  loading: () => <RctPageLoader />
});
