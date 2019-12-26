import React, {PureComponent} from "react";
import { NavLink } from "react-router-dom";

const initProductVariant = {
  name: '',
  groupName : ''
}

export default class Index extends PureComponent {

  state=({
    ProductVariant : {
        name: '',
        groupName : ''
    },
  })

  // Handle Category Name Value
  _HandleProductDetailValue = (e, value) => {
    let ProductVariant = {...this.state.ProductVariant}
    ProductVariant[value] = e
    this.setState({ProductVariant: ProductVariant})
  }

  _SubmitAddVariant = () => {
    let ProductVariant = {...this.state.ProductVariant}
    this.props._AddVariant(ProductVariant)
    this.setState({ProductVariant: initProductVariant})
  }

  render () {

    return (
        <div>

            <button onClick={this._SubmitAddVariant}>Add Variant</button>

            <div className="d-flex">
                <div>Product Variant: </div>
              
                <input type="text" placeholder={"e.g name"} value={this.state.ProductVariant.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                <input type="text" placeholder={"e.g group name"} value={this.state.ProductVariant.groupName} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'groupName')} />
                
            </div>

        </div>
    );
  }
};
