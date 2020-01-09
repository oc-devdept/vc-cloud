import React, {PureComponent} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

import Image from 'Components/Image'
import {Edit, Delete, ExpandMore} from '@material-ui/icons'


export default class Index extends PureComponent {

  render () {

    const item = this.props.ProductVariantValues
    const index = this.props.index

    
    return (
        <div style={{width: '100%', display:'flex', flexDirection:"row", padding: 10, marginTop: 5, alignItems:'center'}}>


            <div style={{flex: 1}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{item.name}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-around', flexDirection:'row', flex: 1, alignItems:'center'}}>
                <div>
                    {item.files.length > 0 && 
                        <Image
                            imageSource={item.files}
                            single={true}
                            thumbNail={true}
                        />
                    }
                    {item.files.length == 0 && 
                        <div></div>
                    }
                </div>
                <div>
                    <span style={{color:"rgba(0,0,0,0.7)"}}>{item.price}</span>
                </div>
                <div>
                    {/* <Checkbox
                        checked={item.isDefault}
                        name="isDefault"
                    />  */}
                    <Radio
                        checked={item.isDefault}
                        // onChange={handleChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                </div>
                {/* <div>
                    <Edit
                        // onClick={() => this.props._EditProductVariant(item)}
                        onClick={() => console.log(item)}

                    />
                </div> */}
                <div>
                    <Delete
                        onClick={() => this.props._DeleteProductVariant(index)}
                    />
                </div>
            </div>
        
        </div>
    );
  }
};

