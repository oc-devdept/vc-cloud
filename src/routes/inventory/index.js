import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/inventoryURL";
//<Route path={url.allPreownedCarsPage} component={async.Products} />c
function acctSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        <Route exact path={url.inventoryPage} component={async.Inventory} />
        <Route path={url.allCarsPage} component={async.Products} />
        <Route path={url.allPreownedCarsPage} component={async.Preownedproducts} />
        <Route path={url.configurePage} component={async.Configure} />
        <Route exact path={url.skuListPage} component={async.SKU} />
        <Route path={url.skuNewPage} component={async.SkuNew} />

        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default acctSwitcher;

