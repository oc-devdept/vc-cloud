import React, { Component, PureComponent } from "react";
import api from "Api";

class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {fields, _HandleText} = this.props

    console.log('Component A Rendered')

    return (
        <div className="todo-dashboard" style={{display:'flex', flexDirection:'column'}}>
          <input type="name" placeholder={"e.g Component Name"} value={fields.name} onChange={(e) => _HandleText(e.target.value)} />
        </div>

    );
  }
}

export default Index;
