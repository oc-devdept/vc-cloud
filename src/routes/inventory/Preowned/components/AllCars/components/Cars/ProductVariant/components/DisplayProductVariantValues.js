import React, {PureComponent} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

import Image from 'Components/Image'
import {Edit, Delete, ExpandMore} from '@material-ui/icons'


export default class Index extends PureComponent {

  render () {

    const item = this.props.ProductVariantValues
    const indexes = this.props.indexes
    const index = this.props.index


    let style = {}
    if(index == indexes){
        style = {backgroundColor: 'rgba(0,0,0,0.075)'}
    }

    return (
        <div style={{...style, width: '100%', display:'flex', flexDirection:"row", padding: 10, alignItems:'center'}}>

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
                    <Radio
                        checked={item.isDefault}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                </div>
                <div>
                    <Edit
                        onClick={() => this.props._EditProductVariant(item, index)}
                    />
                </div>
                <div>
                    <Delete
                        onClick={() => this.props._DeleteProductVariant(item.id)}
                    />
                </div>
            </div>
        
        </div>
    );
  }
};

