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
          path={url.marketingListPage}
          component={async.marketing_list}
        />
        <Route
          exact
          path={url.marketingSingleListPage+"/:id"}
          component={async.marketing_list_single}
        />
       
        <Route
          exact
          path={url.campaignListPage}
          component={async.marketing_campaign}
        />
         <Route
          exact
          path={url.campaignNewPage}
          component={async.marketing_campaign_new}
        />
        <Route
          exact
          path={`${url.campaignListPage}/:id`}
          component={async.marketing_single_campaign}
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

