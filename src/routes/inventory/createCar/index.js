import React, { Component } from "react";


import MakeModelGrade from './components/MakeModelGrade'
import CarDetails from './components/CarDetails'
import CarVariant from './components/CarVariant/index'
import CarProductOptions from './components/CarProductOptions/index'


class CreateCar extends Component {

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
            <CarVariant/>
            <CarDetails/>
            <CarProductOptions/>

        </div>


      </div>
    );
  }
}

export default CreateCar;
