import React, { Component } from "react";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import Cars from './cars/index'
import Parts from './parts/index'
import Details from './details/index'


class InventoryComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }




  render() {

    return (
      <div className="todo-dashboard">

        <Helmet>
          <title>Everyday | Inventory</title>
          <meta name="description" content="Everyday Informational Reports" />
        </Helmet>

        <PageTitleBar title="Inventory" />

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Cars/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Details/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Parts/>
        </div>



      </div>
    );
  }
}

export default InventoryComponent;
