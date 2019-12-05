import React, { Component } from "react";

// page req
import Cars from './cars/index'


class index extends Component {



  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div className="todo-dashboard">


        <div className="row" style={{ marginBottom: 50}}>
          <Cars/>
        </div>

      </div>
    );
  }
}

export default index;
