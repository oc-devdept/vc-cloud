import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/accountingURL";

function acctSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Quotations ------- */}
        <Route
          exact
          path={url.quoteListPage}
          component={async.acct_quotation_component}
        />
        <Route
          path={url.quoteNewPage}
          component={async.acct_new_quotation_component}
        />
        <Route
          exact
          path={`${url.quoteListPage}/:id`}
          component={async.view_quotation}
        />
        <Route
          path={`${url.quoteListPage}/:id/edit`}
          component={async.acct_edit_quotation}
        />

        {/* ------- /Invoice ------- */}
        <Route
          exact
          path={url.invoiceListPage}
          component={async.acct_invoice_component}
        />
        <Route
          path={url.invoiceNewPage}
          component={async.acct_new_invoice_component}
        />
        <Route
          exact
          path={`${url.invoiceListPage}/:id`}
          component={async.acct_view_invoice}
        />
        <Route
          path={`${url.invoiceListPage}/:id/edit`}
          component={async.acct_edit_invoice}
        />

        {/* ------- /Credit_Note ------- */}
        <Route
          exact
          path={url.crednoteListPage}
          component={async.acct_credit_note_component}
        />
        <Route
          path={url.crednoteNewPage}
          component={async.acct_new_credit_note_component}
        />
        <Route
          path={`${url.crednoteListPage}/:id`}
          component={async.view_credit_note}
        />

        {/* ------- /Payment ------- */}
        <Route
          exact
          path={url.paymentPage}
          component={async.acct_payment_component}
        />
        <Route
          path={url.newPayment}
          component={async.acct_new_payment_component}
        />
        <Route path={`${url.paymentPage}/:id`} component={async.view_payment} />

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default acctSwitcher;
