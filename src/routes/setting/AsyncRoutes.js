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
