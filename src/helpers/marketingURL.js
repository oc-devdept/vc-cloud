//====================
// MARKETING ROUTES
//====================

// export const marketingPage = "/app/marketing/dashboard";
// export const mailPage = "/app/marketing/mail";
// export const analyticsPage = "/app/marketing/analytics";

export const marketingListPage = "/app/marketing/list";
export const campaignPage = "/app/marketing/campaign";
export const newCampaignPage = "/app/marketing/campaign/new";
export const marketingTemplatePage = "/app/marketing/template";
 
//TEST
export const campaignTestPage = "/app/marketing/campaignTest";
export const newCampaignTestPage = "/app/marketing/campaign/new";
export const campaignListPage = "/app/marketing/campaigns";
export const singleCampaign = id => `${campaignListPage}/${id}`;
export const singleMailList = id => `/app/marketing/singlelist/${id}`;