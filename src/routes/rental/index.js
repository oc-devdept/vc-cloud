import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/crmURL";

export default function rentalSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        <Route
          exact
          path={"/app/rental/list"}
          component={async.crm_customer_list}
        />
        <Route path={"/app/rental/cars"} component={async.crm_new_customer} />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}
