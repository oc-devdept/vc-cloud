import React, { Component } from "react";


export default class Grade extends Component {


    render() {

    
       
        return (
            <div className="d-flex" style={{flexDirection:'column'}}>

                <div>Grade</div>
                <button style={{width: 300}}>Add Grade</button>


                <p>name</p>
                <p>image</p>
                <p>description</p>
                <p>category_group: objectid</p>


                <p>show all the avaliable Grade</p>
            </div>
        )
    }
}



// name : “”, 
// image: “”,
// description : “”,
// cat_group: objectID (Many2One)