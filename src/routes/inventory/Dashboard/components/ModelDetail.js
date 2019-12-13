import React, { Component } from "react";
import api from "Api";

import { Tabs, Tab, Panel } from '@bumaga/tabs' 


class ModelDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ModelLoading: false,
      ModelDetail
    }
  }
  
  _RenderModelDetail = () => {

    const {name, description, files} = this.props.ModelDetail

    const ProductDetail = this.props.ProductDetail

    return (
      <div className="d-flex" style={{flexDirection:"column"}}>
        <div className="d-flex" style={{flexDirection:"column"}}>
            <span>name: {name}</span>
            <span>description: {description}</span>
            {files &&
              <div>
                {files.length > 0 &&
                  <img
                      src={files[0].url}
                      height={100}
                      width={100}
                  />
                }
              </div>
            }
        </div>


        <div style={{marginTop: 50}}>
          {ProductDetail.length> 0 && 
            <div>
                {ProductDetail.map((e, index) =>{
                  const key = Object.keys(e)[0]
                  const values = Object.values(e)[0]
    
                  return(
                    <div key={index}>

                      {key}

                      {values.length > 0 && 
                        <div style={{display: 'flex', flexDirection:'row', overflow:'auto'}}>
                          {values.map((item, indexes) =>{
                            return (
                              <div onClick={() => console.log(item)} key={indexes} style={{display: 'flex', flexDirection:'column', border : '1px solid black', borderStyle : 'dashed', margin: 10}}>
                                  <span>name: {item.name}</span>
                                  <span>price: {item.price}</span>
                                  <span>{item.value}</span>
                                  <span>{item.value2}</span>
                              </div>
                            )
                          })}
                        </div>
                      }

                      {values.length == 0 && 
                        <div>
                          <span>No Product Detail Found</span>
                        </div>
                      }
                      
                    </div>
                  )
                })}
            </div>
          }
        </div>


        {/* <div style={{marginTop: 50}}>
          {ProductDetail.length> 0 && 
            <div style={{display:'flex', flexDirection:'row'}}>
              
                    <button key={index} onClick={() => console.log(key)}>{key}</button>
                    <div>
                          <Tab><button>Dashboard</button></Tab>
                          <Tab><button>Products</button></Tab>
                          <Tab><button>Configure</button></Tab>
                    </div>
                    <Tabs>
                        
                        {ProductDetail.map((e, index) =>{
                          const key = Object.keys(e)[0]
                          // const values = Object.values(e)[0]
                          return (
                            <Tab>
                              <button key={index} onClick={() => console.log(key)}>{key}</button>
                            </Tab>
                          )
                        })}

                    
                  </Tabs>
                
              })}

            </div>
          }
        </div> */}

        




      </div>
        
    )
  }
 
  _RenderGradeDetail = () => {

    if(this.props.GradeItems.length > 0) {
      return (
        this.props.GradeItems.map((e, index) => {
          return (
                <div onClick={() => this.props._SelectGradeExterior(e)} key={index} style={{margin :10, border: '1px black solid', flexDirection:'column'}} className="d-flex">


                    {e.files.length > 0 && 
                        <img
                            src={e.files[0].url}
                            height={100}
                            width={100}
                        />
                    }


                    <div style={{margin : 3, flexDirection:'column'}} className="d-flex">
                      <span>{e.name}</span>
                      <span>cost_Price: {e.cost_Price}</span>
                      <span>selling_Price: {e.selling_Price}</span>
                    </div>

                    {e.engine &&
                      <div style={{margin : 3, flexDirection:'column'}} className="d-flex">
                        <span>Engine Value: {e.engine.value}</span>
                        <span>Engine Unit: {e.engine.value2}</span>
                      </div>
                    }

                    {e.fuel && 
                      <div style={{margin : 3, flexDirection:'column'}} className="d-flex">
                        <span>Fuel Value: {e.fuel.value}</span>
                        <span>Fuel Unit: {e.fuel.value2}</span>
                      </div>
                    }
                </div>
            )
        })
      )
    } else {
      return (
        <div>
          No Grades Found
        </div>
      )
    }
    
  }



  render() {
        
    return (
        <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50}}>
            In Depth Model Page!
            
            {this.state.ModelLoading && 
                <div>
                    Loading ... 
                </div>
            }

            {!this.state.ModelLoading && 
                <div style={{display:'flex', flexDirection:'row'}}>

                    <div style={{flex: 1}}>
                      {this._RenderModelDetail()}
                    </div>

                    <div style={{width: 300}}>
                      {this._RenderGradeDetail()}
                    </div>
                </div>
                
            }
            
        </div>
    );
  }
}

export default ModelDetail;



