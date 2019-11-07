import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { getDate, getTheTime } from "Helpers/helpers";
import FormInput from "Components/Form/FormInput";
import DateTimePicker from "Components/Form/Pickers/DateTimePicker";
import BlockLayout from "./BlockLayout";

class FollowUpBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, followUp: { ...this.props.data } };
    this.handleChange = this.handleChange.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.saveLog = this.saveLog.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
  }

  setEdit() {
    this.setState({ edit: !this.state.edit });
  }

  handleChange(field, val) {
    this.setState({ followUp: { ...this.state.followUp, [field]: val } });
  }

  saveLog() {
    console.log("save!");
    console.log(this.state.followUp);
  }
  deleteLog() {
    console.log("delete!");
    console.log(this.state.followUp.id);
  }

  showTitle(title, edit) {
    if (edit) {
      return (
        <FormInput
          multiline
          rows={4}
          value={title}
          target="title"
          handleChange={this.handleChange}
        />
      );
    } else {
      return <p>{title}</p>;
    }
  }

  showDate(date, edit) {
    if (edit) {
      return (
        <DateTimePicker
          value={date}
          target="date"
          handleChange={this.handleChange}
        />
      );
    } else {
      return <p className="mb-0">{getDate(date)}</p>;
    }
  }
  showTime(date, edit) {
    if (!edit) {
      return <p className="mb-0">{getTheTime(date)}</p>;
    }
  }
  showResult(result, edit) {
    if (edit) {
      return "showDropDown";
    } else {
      if (result) {
        return <p className="mb-0">{result.name}</p>;
      }
    }
  }

  render() {
    const { edit } = this.state;
    const {
      date,
      title,
      createdAt,
      result,
      type,
      userInfo
    } = this.state.followUp;

    return (
      <BlockLayout
        type={type.name}
        title={this.showTitle(title, edit)}
        result={this.showResult(result, edit)}
        date={this.showDate(date, edit)}
        time={this.showTime(date, edit)}
        owner={userInfo.name}
        createdAt={createdAt}
        hoverButtons={
          edit ? (
            <React.Fragment>
              <Button
                size="medium"
                color="secondary"
                className="px-20"
                onClick={this.saveLog}
              >
                Save
              </Button>
              <Button size="medium" className="px-20" onClick={this.setEdit}>
                Cancel
              </Button>
              <Button
                size="medium"
                className="px-20 text-danger"
                onClick={this.deleteLog}
              >
                Delete
              </Button>
            </React.Fragment>
          ) : (
            <Button
              size="medium"
              color="primary"
              onClick={this.setEdit}
              disableRipple
              disableFocusRipple
            >
              Edit
            </Button>
          )
        }
      />
    );
  }
}

export default FollowUpBlock;
