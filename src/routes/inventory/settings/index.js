import React, { Component } from "react";

import ProductOptions from './components/productOptions/index'
import Details from './components/details/index'
import ProductVariant from './components/productVarient/index'
// import MakeModel from './makeModel/index'

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
          <div>Hello World</div>

        {/* <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <MakeModel/>
        </div> */}

        {/* <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <ProductVariant/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Details/>
        </div> */}

        {/* <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <ProductOptions/>
        </div> */}

      </div>
    );
  }
}

export default CreateProduct;
