import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

export const marketing_list = Loadable({
  loader: () => import("./list"),
  loading: () => <RctPageLoader />
});
export const marketing_campaign = Loadable({
  loader: () => import("./campaign"),
  loading: () => <RctPageLoader />
});
export const marketing_campaign_new = Loadable({
  loader: () => import("./campaign/new"),
  loading: () => <RctPageLoader />
});
export const marketing_template = Loadable({
  loader: () => import("./template"),
  loading: () => <RctPageLoader />
});
