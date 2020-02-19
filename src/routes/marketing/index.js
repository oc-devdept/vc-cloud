import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// routes
import * as url from "Helpers/marketingURL";
// async components
import * as async from "./AsyncRoutes";

function marketingSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        <Route
          exact
          path={url.marketingListPage}
          component={async.marketing_list}
        />
        <Route
          exact
          path={url.campaignPage}
          component={async.marketing_campaign}
        />
        <Route
          exact
          path={url.newCampaignPage}
          component={async.marketing_campaign_new}
        />
        <Route
          exact
          path={url.marketingTemplatePage}
          component={async.marketing_template}
        />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default marketingSwitcher;

