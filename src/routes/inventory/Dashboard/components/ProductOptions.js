import React, { Component } from "react";
import api from "Api";

import Image from 'Components/Image'

class Interior extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
 
  _RenderProductOptions = () => {
   
     return (
        Object.keys(this.props.ProductOptions).map((ee, indexes) => {
  
          if(this.props.ProductOptions[ee].length > 0) {
            return (
              <div key={indexes} style={{display:'flex', flexDirection:'row'}}>
    
                <span>{ee}</span>
    
                {this.props.ProductOptions[ee].map((a, index) => {

                    const item = a.productOption

                    return (
                      <div onClick={() => console.log(item)} key={indexes} style={{display: 'flex', flexDirection:'column', border : '1px solid black', borderStyle : 'dashed', margin: 10}}>
                          <span>name: {item.name}</span>
                          <span>price: {item.price}</span>
                          <span>{item.isDefault}</span>
                          {item.files.length > 0 && 
                              <Image
                                imageSource={item.files}
                                single={true}
                              />
                          }   
                      </div>
                    )
                })}
              </div>
            )

          } else {
            return null
          }
          
        })
      )

  }


  render() {
        
    return (
      <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        
            <span>Show Product Options</span>
            
            <div style={{width: 300}}>
              {this._RenderProductOptions()}
            </div>

        </div>
    );
  }
}

export default Interior;



