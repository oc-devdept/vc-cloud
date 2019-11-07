import React, { Component } from "react";
import { connect } from "react-redux";

import FormInput from "Components/Form/FormInput";
import { Button } from "@material-ui/core";
import RctSectionLoader from "Components/RctSectionLoader";

import { updateCurrentUser } from "Ducks/session/auth";

class UpdateUserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeBaseContact = this.handleChangeBaseContact.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }
  handleChangeBaseContact(field, value) {
    this.setState({
      baseContact: { ...this.state.baseContact, [field]: value }
    });
  }

  submitForm() {
    this.props.updateCurrentUser(this.state);
  }

  render() {
    const { baseContact, email } = this.state;
    return (
      <React.Fragment>
        {this.props.loading ? (
          <RctSectionLoader />
        ) : (
          <form>
            <div className="row justify-content-center">
              <div className="col-5">
                <FormInput
                  label="First Name"
                  defaultValue={baseContact && baseContact.firstName}
                  target="firstName"
                  handleChange={this.handleChangeBaseContact}
                />

                <FormInput
                  label="Mobile"
                  defaultValue={baseContact && baseContact.mobile}
                  target="mobile"
                  handleChange={this.handleChangeBaseContact}
                />
              </div>
              <div className="col-5 offset-md-1">
                <FormInput
                  label="Last Name"
                  defaultValue={baseContact && baseContact.lastName}
                  target="lastName"
                  handleChange={this.handleChangeBaseContact}
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse my-20">
              <Button
                variant="contained"
                className="btn-success text-white"
                onClick={this.submitForm}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { updateCurrentUser }
)(UpdateUserDetailsForm);
