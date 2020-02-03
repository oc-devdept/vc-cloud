import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// inventory
export const Marketing = Loadable({
  loader: () => import("./Dashboard/index"),
  loading: () => <RctPageLoader />  
});

export const Mail = Loadable({
  loader: () => import("./Mail/index"),
  loading: () => <RctPageLoader />
});

export const Analytics = Loadable({
  loader: () => import("./Analytics/index"),
  loading: () => <RctPageLoader />
});

// export const BookingSystem = Loadable({
//   loader: () => import("./BookingSystem/index"),
//   loading: () => <RctPageLoader />
// });

// export default InventoryComponent;
