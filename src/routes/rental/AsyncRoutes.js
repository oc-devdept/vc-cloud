import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

export const rental_list = Loadable({
  loader: () => import("./list"),
  loading: () => <RctPageLoader />
});
export const rental_car = Loadable({
  loader: () => import("./cars"),
  loading: () => <RctPageLoader />
});
export const rental_settings = Loadable({
  loader: () => import("./settings"),
  loading: () => <RctPageLoader />
});