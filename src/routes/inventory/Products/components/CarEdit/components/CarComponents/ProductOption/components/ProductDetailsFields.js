import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields
    const index = this.props.index

    return (
        <div className='d-flex' style={{justifyContent:'space-between'}}>
            <span>{e.name}</span>
            <span>{e.value}</span>
            <span>{e.value2}</span>       
            <button onClick={() => this.props._DeleteProductOptionFields(index)}>X</button>
        </div>
    );
  }
};
