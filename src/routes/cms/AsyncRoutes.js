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

// Footer
export const cms_footer_list = Loadable({
    loader: () => import("./footer"),
    loading: () => <RctPageLoader />
});

export const cms_footer_new = Loadable({
    loader: () => import("./footer/new"),
    loading: () => <RctPageLoader />
});
export const cms_footer_edit = Loadable({
    loader: () => import("./footer/edit"),
    loading: () => <RctPageLoader />
});

//GRAPES 
export const cms_grapejs = Loadable({
    loader: () => import("./grapejs"),
    loading: () => <RctPageLoader />
});

export const cms_grapejs_terms_n_conditions = Loadable({
    loader: () => import("./grapejs/terms-n-conditions/index"),
    loading: () => <RctPageLoader />
});

export const cms_grapejs_about_us = Loadable({
    loader: () => import("./grapejs/about-us/index"),
    loading: () => <RctPageLoader />
});
export const cms_grapejs_book_car_servicing = Loadable({
    loader: () => import("./grapejs/bookCarServicing/index"),
    loading: () => <RctPageLoader />
});
export const cms_grapejs_steps_area = Loadable({
    loader: () => import("./grapejs/stepsArea/index"),
    loading: () => <RctPageLoader />
});
