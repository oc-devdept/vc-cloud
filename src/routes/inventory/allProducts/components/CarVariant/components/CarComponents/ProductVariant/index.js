import React, {PureComponent} from "react";


import ProductVariant  from './ProductVariant'
import ProductVariantValues  from './ProductVariantValues'
import DisplayProductVariantValues from './DisplayProductVariantValues'


export default class Index extends PureComponent {

  render () {

    const Car = this.props.Car

    if(!Car){
      return null
    }
  
    return (
        <div>

            <ProductVariant
              _AddVariant={this.props._AddVariant}
            />


            <h1>Car Variants</h1>
            {Car.productVariant.length > 0 &&
              <div style={{border: '1px solid black'}}>
                  {Car.productVariant.map((e, index) => {

                    return (
                      <div key={index} className="d-flex" style={{border: '1px solid black', flexDirection:"row"}}> 
                        <div style={{flex: 0.5}}>
                          {e.name}
                        </div>

                        <div className="d-flex" style={{flexDirection: 'column'}}>
                          <div className="d-flex" style={{flex:1}}>
                            <ProductVariantValues
                              _AddVariantValues = {(item) => this.props._AddVariantValues(item, e.id)}
                            />
                          </div>

                          {e.variant.map((ea, indexes) => {
                            return (
                              <div className="d-flex" key={indexes}>
                                <DisplayProductVariantValues
                                  ProductVariantValues={ea}
                                />
                              </div>
                            )
                          })}


          
                        </div>

                      </div>
                    )

                  })}
              </div>
            }

            {Car.productVariant.length == 0 &&
              <div>
                  No Variants
              </div>
            }

            <button>Save Product Variant</button>

         
        </div>
    );
  }
};
