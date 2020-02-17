import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// Form inputs
import FormInput from "Components/Form/FormInput";
import Dropzone from "Components/Dropzone";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

// Actions
import {
  newAnnouncement,
  editAnnouncement
} from "Ducks/CallToAction/announcement";

class AnnouncementFormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      name: "",
      start: new Date(),
      end: new Date(),
      files: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  onChange(field, val) {
    this.setState({ [field]: val });
  }

  onSubmit() {
    // submit circular
    const { name, content, files, start, end } = this.state;
    var data = new FormData();
    files.map(file => data.append(`upload`, file));
    data.append("name", name);
    data.append("content", content);
    data.append("start", start);
    data.append("end", end);
    this.props.newAnnouncement(data);
    this.props.handleHide();
  }

  removeFile(file) {
    this.setState(state => {
      const index = state.files.indexOf(file);
      const files = state.files.slice(0);
      files.splice(index, 1);
      return { files };
    });
  }
  handleUpload = file => {
    this.setState({
      files: file
    });
  };

  onUpdate() {
    // update circular
  }

  render() {
    const { show, handleHide, edit } = this.props;
    const { content, name, files, start, end } = this.state;
    return (
      <DialogRoot
        title="Announcement"
        size="md"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        dialogAction={edit ? this.onUpdate : this.onSubmit}
        close
      >
        <FormInput
          placeholder="Enter title here"
          value={name}
          target="name"
          handleChange={this.onChange}
        />
        <FormInput
          placeholder="Enter message here"
          value={content}
          target="content"
          handleChange={this.onChange}
          multiline
          rows={4}
        />
        <div className="row">
          <div className="col-md-6">
            <DatePickerInput
              label="Start"
              value={start}
              target="start"
              handleChange={this.onChange}
            />
          </div>
          <div className="col-md-6">
            <DatePickerInput
              label="End"
              value={end}
              target="end"
              handleChange={this.onChange}
            />
          </div>
        </div>
        <Dropzone
          onDrop={this.handleUpload}
          onRemove={this.removeFile}
          uploadedFiles={files}
          additionalText="Files can't be edited once uploaded."
        />
      </DialogRoot>
    );
  }
}

export default connect(null, {
  newAnnouncement,
  editAnnouncement
})(connectModal({ name: "announcement_form" })(AnnouncementFormDialog));
