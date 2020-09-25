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
                    path={`${url.carPage}/new`}
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

                {/*Blog Page*/}
                <Route
                    exact
                    path={`${url.blogPage}`}
                    component={async.cms_blog_page}
                />
                <Route
                    exact
                    path={`${url.blogPage}/new`}
                    component={async.cms_blog_new}
                />
                <Route
                    exact
                    path={`${url.blogPage}/edit/:id`}
                    component={async.cms_blog_edit}
                />
                <Route
                    exact
                    path={`${url.blogPage}/:id`}
                    component={async.cms_blog_view}
                />

                {/* ------- /404 ------- */}
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default cmsSwitcher;
