import React, { Component } from "react";
import { connectModal } from "redux-modal";

class DealProductForm extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>DealProductForm</p>
      </div>
    );
  }
}

export default connectModal({ name: "deal_product" })(DealProductForm);
