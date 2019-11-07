import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import FormInput from "Components/Form/FormInput";

import { updatePassword } from "Ducks/session/auth";

class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(type, val) {
    var newMsg = this.state.errorMsg;
    if (type == "newPassword") {
      if (val != this.state.confirmNewPassword) {
        newMsg = "Passwords must match";
      } else {
        newMsg = "";
      }
    }
    if (type == "confirmNewPassword") {
      if (val != this.state.newPassword) {
        newMsg = "Passwords must match";
      } else {
        newMsg = "";
      }
    }

    this.setState({ [type]: val, errorMsg: newMsg });
  }

  handleUpdate() {
    if (this.state.oldPassword == "") {
      this.setState({ errorMsg: "Current Password is empty" });
    } else if (this.state.newPassword != this.state.confirmNewPassword) {
      this.setState({ errorMsg: "Passwords must match" });
    } else {
      this.props.updatePassword(this.state.oldPassword, this.state.newPassword);
    }
  }

  render() {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    return (
      <form>
        <div className="row justify-content-center">
          <div className="col-5">
            <FormInput
              label="Current Password"
              value={oldPassword}
              target="oldPassword"
              handleChange={this.handleChange}
            />
            <FormInput
              label="New Password"
              value={newPassword}
              target="newPassword"
              handleChange={this.handleChange}
            />
            <FormInput
              label="Confirm New Password"
              value={confirmNewPassword}
              target="confirmNewPassword"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-row-reverse align-items-center my-20">
          <Button
            variant="contained"
            className="text-white btn-success"
            onClick={this.handleUpdate}
          >
            Update Password
          </Button>
          <span className="text-danger mr-20">{this.state.errorMsg}</span>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { updatePassword }
)(UpdatePasswordForm);
