import React, { Component } from "react";
import api from "Api";


class ModelDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ModelLoading: false,
      ModelDetail
    }
  }
  
  _RenderModelDetail = () => {

    const {name, description, image} = this.props.ModelDetail
    console.log(this.props.ModelDetail)
    return (
        <div className="d-flex" style={{flexDirection:"column"}}>
            <span>name: {name}</span>
            <span>description: {description}</span>
            <span>image: {image}</span>
        </div>
    )
  }
 
  _RenderGradeDetail = () => {

    if(this.props.GradeItems.length > 0) {
      return (
        this.props.GradeItems.map((e, index) => {
          return (
                <div key={index} style={{margin :10, border: '1px black solid', flexDirection:'column'}} className="d-flex">

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
        <div className="todo-dashboard">
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



