import React, { Component } from "react";

import MakeModel from './components/MakeModelGrade/MakeModel'
import Grade from './components/MakeModelGrade/Grade'

import MakeModelGrade from './components/MakeModelGrade'

class CreateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }




  render() {

    return (
      <div className="todo-dashboard">

        <h1>Create New Car Product</h1>

        <div>

       
            <MakeModelGrade/>


        </div>


      </div>
    );
  }
}

export default CreateProduct;
