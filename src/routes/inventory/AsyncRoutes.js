import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// inventory
export const Inventory = Loadable({
  loader: () => import("./Dashboard/index"),
  loading: () => <RctPageLoader />  
});

export const Products = Loadable({
  loader: () => import("./Products/index"),
  loading: () => <RctPageLoader />
});

export const Configure = Loadable({
  loader: () => import("./Configure/index"),
  loading: () => <RctPageLoader />
});

export const BookingSystem = Loadable({
  loader: () => import("./BookingSystem/index"),
  loading: () => <RctPageLoader />
});

// export default InventoryComponent;
