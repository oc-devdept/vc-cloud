import React, {PureComponent} from "react";
import Checkbox from '@material-ui/core/Checkbox';

const OriginalProductVariantValues = {
    name: '',
    image: '',
    price : '',
    isDefault: false,
}

export default class Index extends PureComponent {

  state=({
    ProductVariantValues : {
        name: '',
        image: '',
        price : '',
        isDefault: false,
    },
  })

  // Handle Category Name Value
  _HandleProductDetailValue = (e, value) => {
    let ProductVariantValues = {...this.state.ProductVariantValues}
    ProductVariantValues[value] = e
    this.setState({ProductVariantValues: ProductVariantValues})
  }

  _HandleCheckBox = (e) => {
    const name = e.target.name
    let ProductVariantValues = {...this.state.ProductVariantValues}
    ProductVariantValues[name] = !ProductVariantValues[name]
    this.setState({ProductVariantValues: ProductVariantValues})
  }

  render () {

    return (
        <div>


            <div className="d-flex">
                <div style={{display:'flex', flexDirection:"column"}}>
                    <span>Name</span>
                    <input type="text" placeholder={"e.g name"} value={this.state.ProductVariantValues.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                </div>
               
                <div style={{display:'flex', flexDirection:"column"}}>
                    <span>Image</span>
                    <input type="text" placeholder={"e.g image"} value={this.state.ProductVariantValues.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                </div>

                <div style={{display:'flex', flexDirection:"column"}}>
                    <span>Price</span>
                    <input type="text" placeholder={"e.g price"} value={this.state.ProductVariantValues.price} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'price')} />
                </div>

                <div style={{display:'flex', flexDirection:"column"}}>
                    <span>isDefault</span>
                    <Checkbox
                        edge="end"
                        onChange={this._HandleCheckBox}
                        checked={this.state.ProductVariantValues.isDefault}
                        name="isDefault"
                    />   
                </div>
            </div>

            <button onClick={() => {
                this.props._AddVariantValues(this.state.ProductVariantValues)
                this.setState({ProductVariantValues: OriginalProductVariantValues})
            }}>Add Product Variant Value</button>

        </div>
    );
  }
};


