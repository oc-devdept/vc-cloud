import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/* banners */
export const cms_banner_list = Loadable({
    loader: () => import("./banners"),
    loading: () => <RctPageLoader />
});
export const cms_new_banner = Loadable({
    loader: () => import("./banners/new"),
    loading: () => <RctPageLoader />
});
export const cms_single_banner = Loadable({
    loader: () => import("./banners/view"),
    loading: () => <RctPageLoader />
});
export const cms_edit_banner = Loadable({
    loader: () => import("./banners/edit"),
    loading: () => <RctPageLoader />
});

/* featured */
export const cms_featured_list = Loadable({
    loader: () => import("./featured"),
    loading: () => <RctPageLoader />
});