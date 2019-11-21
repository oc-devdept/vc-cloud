import React, { Component } from "react";



const Grade = (props) => {

    return (
      <div className='d-flex' style={{margin: 5, flexDirection:'column'}}>
        
        <div className="d-flex" style={{flexDirection:'row'}}>        
          <div>
              Grade:
          </div>

          {props.ModelId != '' && 
            <input 
              type="name" 
              placeholder={"e.g Name of Model"} 
              value={props.Grade ? props.Grade : ''} 
              onChange={(e) => props._HandleGradeDetailValue(e.target.value)}
            />
          }
        </div>

        {props.ModelId != '' && 
          <div className="d-flex" style={{flexDirection:'column'}}>
            <input 
              type="name" 
              placeholder={"e.g Description of Model"} 
              value={props.Grade ? props.Grade : ''} 
              onChange={(e) => props._HandleGradeDetailValue(e.target.value)}
            />
            <input 
              type="name" 
              placeholder={"e.g Image"} 
              value={props.Grade ? props.Grade : ''} 
              onChange={(e) => props._HandleGradeDetailValue(e.target.value)}
            />
          </div>
        }

      </div>
    )
  
}

export default Grade;
