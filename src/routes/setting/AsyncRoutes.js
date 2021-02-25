import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Company Settings
 */
// export const companySettings = Loadable({
//   loader: () => import("./companySettings"),
//   loading: () => <RctPageLoader />
// });

/**
 * Profile Settings
 */
export const profileSettings = Loadable({
  loader: () => import("./profileSettings"),
  loading: () => <RctPageLoader />
});

/**
 * User Management
 */
export const userManagement = Loadable({
  loader: () => import("./userManagement"),
  loading: () => <RctPageLoader />
});

/**
 * Roles
 */
export const roles = Loadable({
  loader: () => import("./roles"),
  loading: () => <RctPageLoader />
});

/**
 * Call To Action
 */
export const announcements = Loadable({
  loader: () => import("./CallToAction/announcements"),
  loading: () => <RctPageLoader />
});

/**
 * Website Setting
 */
export const websiteSettings = Loadable({
  loader: () => import("./websiteSettings"),
  loading: () => <RctPageLoader />
});

/**
 * Commission Setting
 */
export const commission = Loadable({
  loader: () => import("./commsSetting"),
  loading: () => <RctPageLoader />
});

/**
 * Email Setting
 */
export const notificationSettings = Loadable({
  loader: () => import("./notificationSettings"),
  loading: () => <RctPageLoader />
});

export const followupTypeSetting = Loadable({
  loader: () => import("./crmSettings/followup/followupType"),
  loading: () => <RctPageLoader />,
});

export const followupResultSetting = Loadable({
  loader: () => import("./crmSettings/followup/followupResult"),
  loading: () => <RctPageLoader />,
});

export const bookingTypeSetting = Loadable({
  loader: () => import("./calSettings/bookingType"),
  loading: () => <RctPageLoader />
});
