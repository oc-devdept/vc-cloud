import React, { Component } from "react";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import api from "Api";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import AllCars from "./components/AllCars";
// import AddNewCar from './components/AddNewCar'

import ProfileTabs from "Components/Layout/ProfileTabs";
import ProductCard from "./components/ProductCard";

class AllProducts extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Quotations" />

        <PageTitleBar
          title={"All Cars"}
          // createLink={quoteNewPage}
        />

        <div className="row">
          <div className="col-md-3">
            <ProductCard />
          </div>

          <div className="col-md-9">
            <ProfileTabs loading={false}>
              <div label="All Cars">
                <AllCars />
              </div>

              <div label="Test"></div>
            </ProfileTabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllProducts;
