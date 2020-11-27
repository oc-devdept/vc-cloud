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

                <Route
                    exact
                    path={`${url.configPage}`}
                    component={async.cms_config_page}
                />  

                {/* -----Route for Footer page----- */}
                <Route
                    exact
                    path={`${url.footerPage}`}
                    component={async.cms_footer_list}
                />  

                {/* ------- /404 ------- */}
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default cmsSwitcher;
