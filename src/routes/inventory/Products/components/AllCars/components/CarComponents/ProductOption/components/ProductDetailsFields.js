import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields
    const index = this.props.index
    
    return (
        <div className='d-flex' style={{justifyContent:'space-evenly'}}>
           
            <span>Name: {e.name}</span>
            <span>Price: {e.price} SGD</span>
            {/* <span>{e.value2}</span>   */}
            {/* <span>{e.image}</span>   */}
             {/* {e.files.length > 0 && 
                <img
                    src={e.files[0].url}
                    height={100}
                    width={100}
                />
            }    */}
            <span>IsDefault: {`${e.isDefault}`}</span>
            <span>Editable: {`${e.editable}`}</span>     

            <button onClick={() => this.props._DeleteProductOptionFields(index)}>X</button>
        </div>
    );
  }
};
