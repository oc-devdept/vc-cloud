import React, { Component } from "react";
import api from "Api";

import Image from 'Components/Image'

class Exterior extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
 
  _RenderProductVariant = () => {

    if(this.props.Exterior.length > 0) {

      return (
        <div style={{display: 'flex', flexDirection:'column'}}>
          {this.props.Exterior.map((e, index) => {
            return (
                  <div key={index} style={{margin :10, border: '1px black solid', flexDirection:'column'}} className="d-flex">
                      
                      <span>{e.name}</span>
                      
                      {e.objects.length > 0 && 
                        <div  style={{display: 'flex', flexDirection:'row', overflow:'auto'}}>
                          {e.objects.map((item, indexes) =>{
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
                      }

                      {e.objects.length == 0 && 
                        <div>
                          <span>No Product Variant Found</span>
                        </div>
                      }

                  </div>
              )
          })}
        </div>
      )
    } else {
      return (
        <div>
          No Exterior Product Variant Found
        </div>
      )
    }
    
  }


  render() {
    
    return (
      <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        
            <span>Show Exterior Product Variant</span>
            
            <div style={{width: 300}}>
              {this._RenderProductVariant()}
            </div>

        </div>
    );
  }
}

export default Exterior;



