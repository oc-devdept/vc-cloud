import React, { Component } from "react";

import ProductOptions from './productOptions/index'
import Details from './details/index'
import MakeModel from './makeModel/index'
import ProductVariant from './productVarient/index'

// page

class CreateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div className="todo-dashboard">

        {/* <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <MakeModel/>
        </div> */}

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <ProductVariant/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Details/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <ProductOptions/>
        </div>

      </div>
    );
  }
}

export default CreateProduct;
