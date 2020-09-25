import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Car Routes
 */
export const cms_car_page = Loadable({
    loader: () => import("./car"),
    loading: () => <RctPageLoader />
});
export const cms_car_single = Loadable({
    loader: () => import("./car/view"),
    loading: () => <RctPageLoader />
});
export const cms_car_new = Loadable({
    loader: () => import("./car/new"),
    loading: () => <RctPageLoader />
});
export const cms_car_edit = Loadable({
    loader: () => import("./car/edit"),
    loading: () => <RctPageLoader />
});

//blog
export const cms_blog_page = Loadable({
    loader: () => import("./blog"),
    loading: () => <RctPageLoader />
});
export const cms_blog_new = Loadable({
    loader: () => import("./blog/new"),
    loading: () => <RctPageLoader />
});
export const cms_blog_view = Loadable({
    loader: () => import("./blog/view"),
    loading: () => <RctPageLoader />
});
export const cms_blog_edit = Loadable({
    loader: () => import("./blog/edit"),
    loading: () => <RctPageLoader />
});
