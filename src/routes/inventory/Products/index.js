import React, { Component } from "react";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import ProfileTabs from "Components/Layout/ProfileTabs";


import AllCars from './components/AllCars'
import ProductCard from "./components/ProductCard"


class AllProducts extends Component {
  render() {
    return (
      
        <React.Fragment>

            <Helmet>
              <title>Everyday | Quotations</title>
              <meta name="description" content="Everyday Quotation Management" />
            </Helmet>

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
                    <AllCars/>
                  </div>

                  <div label="Dashboard">
                    
                  </div>
                </ProfileTabs>
              </div>
            </div>
      </React.Fragment>
    );
  }
}

export default AllProducts;
