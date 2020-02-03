import React, { Component } from "react";


import { Route, Switch, Redirect } from "react-router-dom";
// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/marketingURL";

function acctSwitcher() {

  return (
    <div className="saas-dashboard">
        <Switch>
          <Route exact path={url.marketingPage} component={async.Marketing} />
          <Route path={url.mailPage} component={async.Mail} />
          <Route path={url.analyticsPage} component={async.Analytics} />
          <Redirect to="/404" />
        </Switch>
    </div>
  );
}

export default acctSwitcher;


// <div className="saas-dashboard">
//   <Tabs>
//       <div>
//         <Tab><button>Dashboard</button></Tab>
//         <Tab><button>Products</button></Tab>
//         <Tab><button>Configure</button></Tab>
//       </div>
//       <Panel>
//         <Dashboard/>
//       </Panel>
//       <Panel>
//         <Products/>
//       </Panel>
//       <Panel>
//         <Configure/>
//       </Panel>
//   </Tabs>
// </div>