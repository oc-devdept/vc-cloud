import React, { Component } from "react";



const Grade = (props) => {


    return (
      <div className='d-flex' style={{margin: 5}}>
        <div>
          Grade
        </div>

        <input 
          type="name" 
          placeholder={"e.g Name of Model"} 
          value={props.Grade} 
          onChange={(e) => props._HandleGradeDetailValue(e.target.value)}
        />
      </div>
    )
  
}

export default Grade;
