import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// inventory
const InventoryComponent = Loadable({
  loader: () => import("./index"),
  loading: () => <RctPageLoader />
  
});

export default InventoryComponent;
