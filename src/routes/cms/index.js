import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/cmsURL";

function cmsSwitcher() {
    return (
        <div className="saas-dashboard">
            <Switch>
                <Route
                    exact
                    path={url.carPage}
                    component={async.cms_car_page}
                />

                <Route
                    exact
                    path={url.carNewPage}
                    component={async.cms_car_new}
                />

                <Route
                    exact
                    path={`${url.carPage}/:id`}
                    component={async.cms_car_single}
                />
                <Route
                    exact
                    path={`${url.carPage}/edit/:id`}
                    component={async.cms_car_edit}
                />

                {/* ------- /404 ------- */}
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default cmsSwitcher;
