import React, { Component } from "react";
import { connectModal } from "redux-modal";

import DialogRoot from "Components/Dialog/DialogRoot";
import FormInput from "Components/Form/FormInput";

class MailingListDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.edit && this.setState({ ...this.props.edit });
  }

  onChange(field, val) {
    this.setState({ [field]: val });
  }

  onSubmit() {
    this.props.saveList(this.state);
    this.props.handleHide();
  }

  render() {
    const { show, handleHide } = this.props;
    return (
      <DialogRoot
        title="New Mailing List"
        size="sm"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        dialogAction={this.onSubmit}
        close
      >
        <FormInput
          placeholder="Enter name here"
          label="Mailing List Title"
          value={this.state.name}
          target="name"
          handleChange={this.onChange}
        />
      </DialogRoot>
    );
  }
}
export default connectModal({ name: "new_mailing_list" })(MailingListDialog);
