//====================
// CMS ROUTES
//====================

/*
*  Banner pages
*/
export const bannerListPage = "/app/cms/banner";
export const singleBanner = id => `${bannerListPage}/${id}`;
export const bannerNewPage = bannerListPage + "/new";
export const bannerEditPage = id => `${bannerListPage}/${id}/edit`;

/*
*  Feature page
*/
export const featuredListPage = "/app/cms/featured";

import {customerListPage} from "./crmURL";

/**
 * Car Pages
 */
export const carPage = "/app/cms/car";

export const carNewPage = `${carPage}/new`;
export const singleCar = id => `${carPage}/${id}`;

/**
 * Blog Pages
 */
export const blogPage = "/app/cms/blog";
export const blogNewPage = `${blogPage}/new`;
export const singleBlog = id => `${blogPage}/${id}`;

/**
 * Footer Page
 */
export const footerPage = "/app/cms/footer";

export const footerNewPage = `${footerPage}/new`;

export const footerEditPage = id => `${footerPage}/edit/${id}`;

/**
 * Grape JS
 */

 export const grapeJsPage = "/app/cms/grapejs"
 export const grapeJSEdit = "/app/cms/grapejs/terms-n-conditions";

/**
 * config options
 */
export const configPage = "/app/cms/configoptions";
