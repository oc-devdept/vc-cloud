import React, { Component } from "react";

import ProductOptions from "./components/productOptions";
import ProductDetails from "./components/productDetails";
import ProductVariant from "./components/productVarient";
import MakeModel from "./components/makeModel";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import ProfileTabs from "Components/Layout/ProfileTabs";
import ConfigureCard from "./components/ConfigureCard";

class CreateProduct extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Inventory Settings" />

        <PageTitleBar title={"Settings"} />

        <div className="row">
          <div className="col-md-3">
            <ConfigureCard />
          </div>

          <div className="col-md-9">
            <ProfileTabs loading={false}>
              <div label="MAKE & MODEL">
                <MakeModel />
              </div>

              <div label="PRODUCT VARIANT">
                <ProductVariant />
              </div>

              <div label="PRODUCT DETAILS">
                <ProductDetails />
              </div>

              <div label="PRODUCT OPTION">
                <ProductOptions />
              </div>
            </ProfileTabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateProduct;
