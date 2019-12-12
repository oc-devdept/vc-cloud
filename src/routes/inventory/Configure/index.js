import React, { Component } from "react";

import ProductOptions from './components/productOptions'
import Details from './components/details'
import ProductVariant from './components/productVarient'
import Tags from './components/tags'


class CreateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }



  render() {

    return (
      <div className="todo-dashboard">
  
        <div className="row" style={{border : '1px solid black', marginBottom: 50, marginTop: 50}}>
          <Tags/>
        </div>

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
