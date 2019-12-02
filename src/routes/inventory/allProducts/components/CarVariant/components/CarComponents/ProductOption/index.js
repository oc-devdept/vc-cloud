import React, {PureComponent} from "react";


export default class Index extends PureComponent {

  render () {

    const Car = this.props.Car

    if(!Car){
      return null
    }
  
    return (
        <div>

            <h1>Car Option</h1>

            <div style={{border : '1px solid black', borderStyle : 'dashed', height: 60, display:'flex', justifyContent:'center', alignItems:'center'}}>
                Drag columns from the sidebar and drop them here to create your product detail
            </div>
            
            <button>Save Product Option</button>
        </div>
    );
  }
};
