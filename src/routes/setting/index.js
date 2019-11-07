import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import settingsList from "./components/_settingsList";
import SettingsDirectory from "./components/SettingsDirectory";

class Settings extends Component {
  render() {
    const { match, location } = this.props;
    if (location.pathname === "/app/settings") {
      return <Redirect to={"/app/settings/general/profile-settings"} />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | System Settings</title>
          <meta name="description" content="Everyday System" />
        </Helmet>
        <PageTitleBar title="Settings" />
        <div className="row">
          <div className="col-lg-2">
            <SettingsDirectory />
          </div>
          <div className="col-lg-10">
            <Switch>
              {settingsList.map(list =>
                list.links.map(link => (
                  <Route
                    exact
                    key={link.path}
                    path={match.url + link.path}
                    component={link.asyncComponent}
                  />
                ))
              )}

              {/* ------- /404 ------- */}
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Settings);
