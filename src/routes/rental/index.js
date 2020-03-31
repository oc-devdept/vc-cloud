import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/rentalURL";

export default function rentalSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        <Route exact path={url.rentalListPage} component={async.rental_list} />
        <Route path={url.rentalCarPage} component={async.rental_car} />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}
