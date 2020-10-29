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
  loader: () => import("./Cars/index"),
  loading: () => <RctPageLoader />
});

export const Preownedproducts = Loadable({
  loader: () => import("./Preowned/index"),
  loading: () => <RctPageLoader />
});

export const Configure = Loadable({
  loader: () => import("./Configure/index"),
  loading: () => <RctPageLoader />
});

// export default InventoryComponent;
