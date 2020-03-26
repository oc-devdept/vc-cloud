import React, { Component } from "react";

import ProductOptions from "./components/productOptions";
import ProductDetails from "./components/productDetails";
import ProductVariant from "./components/productVarient";
import MakeModel from "./components/makeModel";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import ProfileTabs from "Components/Layout/ProfileTabs";

class CreateProduct extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Inventory Settings" />

        <PageTitleBar title={"Settings"} />

        <div className="row">
          <div className="col-md-12">
            <ProfileTabs loading={false}>
              <div label="MAKE & MODEL">
                <MakeModel />
              </div>

              <div label="CAR VARIANT">
                <ProductVariant />
              </div>

              <div label="CAR SPECIFICATION">
                <ProductDetails />
              </div>

              <div label="CAR EQUIPMENT">
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
