import React, { Component } from "react";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import AllCars from "./components/AllCars";

class AllProducts extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Inventory" />

        <PageTitleBar
          title={"All Cars"}
          // createLink={quoteNewPage}
        />

        <div className="row">
          <div className="col-md-12">
            <AllCars />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllProducts;
