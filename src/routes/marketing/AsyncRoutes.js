import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// export const marketing_list = Loadable({
//   loader: () => import("./list"),
//   loading: () => <RctPageLoader />
// });
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

//TEST NEW MAILING AND CAMPAIGN SYSTEM 
export const marketing_campaignTest = Loadable({
  loader: () => import("./campaignTest"),
  loading: () => <RctPageLoader />
});
export const marketing_campaignTest_new = Loadable({
  loader: () => import("./campaignTest/new"),
  loading: () => <RctPageLoader />
});
export const marketing_single_campaign = Loadable({
  loader: () => import("./campaignTest/view"),
  loading: () => <RctPageLoader />
});
//TEST NEW MAILING LIST

export const marketing_list = Loadable({
  loader: () => import("./listTest"),
  loading: () => <RctPageLoader />
});


export const marketing_list_single = Loadable({
  loader: () => import("./SingleList"),
  loading: () => <RctPageLoader />
});
