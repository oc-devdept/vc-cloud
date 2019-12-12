import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields
    const index = this.props.index

    return (
        <div className='d-flex' style={{justifyContent:'space-between'}}>
            <span>Name: {e.name}</span>
            <span>{e.value}</span>
            <span>Units {e.value2}</span>       
            <button onClick={() => this.props._DeleteProductDetailFields(index)}>X</button>
        </div>
    );
  }
};
