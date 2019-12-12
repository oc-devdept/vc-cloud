import React, { Component, PureComponent } from "react";
import api from "Api";

class Index extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {fields, _HandlePureText} = this.props

    console.log('PureComponent B Rendered')

    return (
        <div className="todo-dashboard" style={{display:'flex', flexDirection:'column'}}>
            <input type="name" placeholder={"e.g PureComponent Name"} value={fields.name} onChange={(e) => _HandlePureText(e.target.value)} />
        </div>

    );
  }
}

export default Index;
