import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/inventoryURL";

function acctSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        <Route exact path={url.inventoryPage} component={async.Inventory} />
        <Route path={url.allCarsPage} component={async.Products} />
        <Route path={url.configurePage} component={async.Configure} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default acctSwitcher;

