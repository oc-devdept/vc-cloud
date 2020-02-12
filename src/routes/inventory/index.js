import React, { Component } from "react";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Tabs, Tab, Panel } from "@bumaga/tabs";

import Products from "./Products/index";
import Configure from "./Configure/index";
import Dashboard from "./Dashboard/index";

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
        <Route path={url.bookingSystemPage} component={async.BookingSystem} />

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
