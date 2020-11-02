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

export const cms_config_page = Loadable({
    loader: () => import("./configoptions"),
    loading: () => <RctPageLoader />
});
