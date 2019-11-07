import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/crmURL";

function crmSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Leads ------- */}
        <Route exact path={url.leadListPage} component={async.crm_lead_list} />
        <Route path={url.leadNewPage} component={async.crm_new_lead} />
        <Route path={url.leadImportPage} component={async.crm_import_lead} />
        <Route
          exact
          path={`${url.leadListPage}/:id`}
          component={async.crm_single_lead}
        />
        <Route
          path={`${url.leadListPage}/:id/edit`}
          component={async.crm_edit_lead}
        />

        {/* ------- /Customers ------- */}
        <Route
          exact
          path={url.customerListPage}
          component={async.crm_customer_list}
        />
        <Route path={url.customerNewPage} component={async.crm_new_customer} />
        <Route
          path={url.customerImportPage}
          component={async.crm_import_customer}
        />
        <Route
          exact
          path={`${url.customerListPage}/:id`}
          component={async.crm_single_customer}
        />
        <Route
          path={`${url.customerListPage}/:id/edit`}
          component={async.crm_edit_customer}
        />

        {/* ------- /Accounts ------- */}
        <Route
          exact
          path={url.accountListPage}
          component={async.crm_account_list}
        />
        <Route path={url.accountNewPage} component={async.crm_new_account} />
        <Route
          path={url.accountImportPage}
          component={async.crm_import_account}
        />
        <Route
          exact
          path={`${url.accountListPage}/:id`}
          component={async.crm_single_account}
        />
        <Route
          path={`${url.accountListPage}/:id/edit`}
          component={async.crm_edit_account}
        />

        {/* ------- /Deals ------- */}
        <Route exact path={url.dealListPage} component={async.crm_deal_list} />
        <Route path={url.dealNewPage} component={async.crm_new_deal} />
        <Route path={url.dealImportPage} component={async.crm_import_deal} />
        <Route
          exact
          path={`${url.dealListPage}/:id`}
          component={async.crm_single_deal}
        />
        <Route
          path={`${url.dealListPage}/:id/edit`}
          component={async.crm_edit_deal}
        />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default crmSwitcher;
