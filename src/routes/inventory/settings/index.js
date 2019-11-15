import React, { Component } from "react";
import Parts from './parts/index'

import Details from './details/index'

// page

class CreateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div className="todo-dashboard">

        <div> 
            Settings!!
        </div>


        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Details/>
        </div>

        <div className="row" style={{border : '1px solid black', marginBottom: 50}}>
          <Parts/>
        </div>



      </div>
    );
  }
}

export default CreateProduct;
