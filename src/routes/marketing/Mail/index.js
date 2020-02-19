import React, { Component } from "react";
import api from "Api";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import ProfileTabs from "Components/Layout/ProfileTabs";
import DashboardCard from "./components/DashboardCard";

const Index = () => {
  return (
    <div>
      <React.Fragment>
        <Helmet title="Quotations" />

        <PageTitleBar title={"All Cars"} />

        <div className="row">
          <div className="col-md-3">
            <DashboardCard />
          </div>

          <div className="col-md-9">
            <ProfileTabs loading={false}>
              <div label="Mail">Mail!</div>

              <div></div>
            </ProfileTabs>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Index;
