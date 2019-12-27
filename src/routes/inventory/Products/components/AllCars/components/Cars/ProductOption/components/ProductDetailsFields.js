import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields
    const Id = this.props.Id
    return (
        <div className='d-flex' style={{justifyContent:'space-evenly'}}>
           
            <div style={{flex:1}}>
              <span>{e.name}</span>
            </div>

            <div>
              <span>{e.price} SGD</span>
            </div>
            
            {/* <span>{e.value2}</span>   */}
            {/* <span>{e.image}</span>   */}
             {/* {e.files.length > 0 && 
                <img
                    src={e.files[0].url}
                    height={100}
                    width={100}
                />
            }    */}
            <div>
              <span>{`${e.isDefault}`}</span>
            </div>

            <div>
              <span>{`${e.editable}`}</span>     
            </div>
            

            <button onClick={() => this.props._DeleteProductOptionFields(Id)}>X</button>
        </div>
    );
  }
};
