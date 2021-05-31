//====================
// MARKETING ROUTES
//====================

// export const marketingPage = "/app/marketing/dashboard";
// export const mailPage = "/app/marketing/mail";
// export const analyticsPage = "/app/marketing/analytics";

export const marketingListPage = "/app/marketing/list";
export const marketingSingleListPage = "/app/marketing/singlelist";
export const singleMailList = id => `/app/marketing/singlelist/${id}`;
export const campaignListPage = "/app/marketing/campaigns";
export const singleCampaign = id => `${campaignListPage}/${id}`;
export const campaignNewPage = campaignListPage + "/new";
export const marketingTemplatePage = "/app/marketing/template";
 