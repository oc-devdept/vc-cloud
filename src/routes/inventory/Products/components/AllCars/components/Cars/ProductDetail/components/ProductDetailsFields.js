import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields

    return (
        <div className='d-flex' style={{justifyContent:'space-between'}}>
            <div style={{flex:1}}>
              <span>{e.name}</span>
            </div>
            
            <div>
              <span>{e.value}</span>
            </div>

            <div>
              <span>{e.value2}</span>    
            </div>
           
            <button onClick={() => this.props._DeleteProductDetailFields(e.id)}>X</button>
        </div>
    );
  }
};
