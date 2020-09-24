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

