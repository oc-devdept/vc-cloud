import React, { PureComponent } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { Tabs, Tab, Panel } from '@bumaga/tabs' 



class ProductDetail extends PureComponent {
    

    render() {

        if(this.props.ProductDetailCategory.length == 0){
            return null
        }
        
        console.log('ProductDetail')

        return (
            <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>

                <Tabs>
                    <div>
                        {this.props.ProductDetailCategory.map((e, index)=>{
                            return (
                                <Tab key={index}><button>{e.name}</button></Tab>
                            )
                        })}
                    </div>

                    {this.props.ProductDetailCategory.map((e, index)=>{
                        return (
                            <Panel key={index}>
                                {e.objects.map((each, indexes) =>{

                                    return (
                                        <div key={indexes}>
                                            <div>
                                                <span style={{margin:5}}>{each.name}</span>
                                                <span style={{margin:5}}>{each.value2}</span>
                                                <span style={{margin:5}}>{each.type}</span>

                                                {/* <input 
                                                    type="name" 
                                                    placeholder={"e.g input value"} 
                                                    value={each.value} 
                                                    // onChange={(e) => props._HandleProduct(e.target.value, 'name')}
                                                /> */}
                                            </div>
                                            
                                        </div>
                                    )
                                })}
                            </Panel>
                        )
                    })}

                </Tabs>

            </div>
        )
    }
  
}

export default ProductDetail;

// id: "5dc52b32ffd81f03d1032401"
// name: "Sport Car"
// productDetailCategoryId: "5dc52b25ffd81f03d1032400"
// type: ""
// value: "Yes"
// value2: ""