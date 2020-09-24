import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/cmsURL";

function cmsSwitcher() {
    return (
        <div className="saas-dashboard">
            <Switch>
                <Route exact
                    path={url.bannerListPage}
                    component={async.cms_banner_list} 
                />
                <Route path={url.bannerNewPage} component={async.cms_new_banner} />
                <Route exact
                    path={`${url.bannerListPage}/:id`}
                    component={async.cms_single_banner}
                />
                <Route
                    path={`${url.bannerListPage}/:id/edit`}
                    component={async.cms_edit_banner}
                />

                <Route exact
                    path={url.featuredListPage}
                    component={async.cms_featured_list} 
                />

                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default cmsSwitcher;