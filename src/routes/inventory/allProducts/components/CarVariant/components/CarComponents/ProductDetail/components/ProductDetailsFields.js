import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {
    const e = this.props.Fields
    const index = this.props.index
    return (
        <div className='d-flex' style={{justifyContent:'space-between'}}>
            <span>{e.name}</span>
            <input type="value1" placeholder={"e.g 890"} value={e.value} onChange={this.props._HandleProductDetailValue} />
            <span>{e.value2}</span>       

            <button onClick={() => this.props._DeleteProductDetailFields(index)}>X</button>
        </div>
    );
  }
};
