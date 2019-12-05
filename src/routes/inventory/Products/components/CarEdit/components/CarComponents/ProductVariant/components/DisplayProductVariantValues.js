import React, {PureComponent} from "react";
import Checkbox from '@material-ui/core/Checkbox';


export default class Index extends PureComponent {

  render () {

    const item = this.props.ProductVariantValues
    const index = this.props.index

    
    return (
        <div className="d-flex" style={{justifyContent:'space-between', flex:1}}>

            <div style={{display:'flex', flexDirection:"column"}}>
                <span>{item.name}</span>
            </div>
            
            <div style={{display:'flex', flexDirection:"column"}}>
                <span>{item.image}</span>
            </div>

            <div style={{display:'flex', flexDirection:"column"}}>
                <span>{item.price}</span>
            </div>

            <div style={{display:'flex', flexDirection:"column"}}>
                <Checkbox
                    edge="end"
                    checked={item.isDefault}
                    name="isDefault"
                />   
            </div>

            <button onClick={() => this.props._DeleteProductVariant(index)}>X</button>
            
        </div>
    );
  }
};


