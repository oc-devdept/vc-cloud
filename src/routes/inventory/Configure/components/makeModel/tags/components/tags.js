import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

import Input from "Components/Inventory/Input";
import Text from "Components/Inventory/Text";

import Button from "Components/Inventory/Button";

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

class index extends PureComponent {
  constructor(props) {
    super(props);

    let Title = "";
    let Button = "";
    let Tags = {
      id: "",
      value: ""
    };

    switch (this.props.Action) {
      case "Create":
        Title = "CREATE NEW CAR TAG VALUE FOR MODEL";
        Button = "CREATE";
        break;
      case "Edit":
        Title = "EDIT CAR TAG VALUE FOR MODEL";
        Tags = {
          id: this.props.Data[0],
          value: this.props.Data[1]
        };
        Button = "SAVE CHANGES";
        break;
      case "Delete":
        Title = "DELETE NEW CAR TAG VALUE FOR MODEL";
        Tags = {
          id: this.props.Data[0],
          value: this.props.Data[1]
        };
        Button = "CONFIRM DELETE";
        break;
      default:
        break;
    }

    this.state = {
      Tags: Tags,
      Title: Title,
      Button: Button
    };
  }

  _SaveTags = async () => {
    const result = validateForm(this.state.Tags);
    if (result) {
      await api.post(`/tags`, {
        name: this.state.Tags
      });

      await this.props._SaveTagsDone();
      await this.props._RestartToggle();
      NotificationManager.success("Tag saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary information"
      );
    }
  };

  _EditTags = async () => {
    const result = validateForm(this.state.Tags);
    if (result) {
      await api.post(`/tags/editTagDetail`, {
        data: this.state.Tags
      });

      await this.props._SaveTagsDone();
      await this.props._RestartToggle();
      NotificationManager.success("Tag saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary information"
      );
    }
  };

  _OnChange = (e, element) => {
    let Tags = { ...this.state.Tags };
    Tags[element] = e;
    this.setState({ Tags: Tags });
  };

  render() {
    let Body = null;

    switch (this.props.Action) {
      case "Delete":
        Body = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <span>
              {`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}
              <span style={{ fontWeight: "600" }}>
                YOU CANNOT UNDO THIS ACTION
              </span>
            </span>
            <span>{this.state.Tags}</span>
          </div>
        );
        break;
      default:
        Body = (
          <Input
            divStyle={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
            title="CAR TAG VALUE FOR MODEL"
            placeholder="Enter a new Car Tag Value for Model here (e.g SUV)"
            value={this.state.Tags.value}
            element={"value"}
            _HandleProduct={this._OnChange}
          />
        );
        break;
    }

    let SaveButton = null;
    switch (this.props.Action) {
      case "Create":
        SaveButton = (
          <Button
            divStyle={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              marginBottom: 10
            }}
            _Function={this._SaveTags}
            product={""}
            files={""}
            title={this.state.Button}
          />
        );
        break;

      case "Edit":
        SaveButton = (
          <Button
            divStyle={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              marginBottom: 10
            }}
            _Function={this._EditTags}
            product={""}
            files={""}
            title={this.state.Button}
          />
        );
        break;
      default:
        SaveButton = (
          <Button
            divStyle={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              marginBottom: 10
            }}
            _Function={this._EditTags}
            product={""}
            files={""}
            title={this.state.Button}
          />
        );
        break;
    }

    return (
      <div className="d-flex" style={{ flexDirection: "column" }}>
        <div className="d-flex justify-content-center">
          <div style={{ flex: 1 }} className="d-flex justify-content-center">
            <span style={{ textAlign: "center" }}>{this.state.Title}</span>
          </div>
          <Cancel fontSize="large" onClick={this.props._RestartToggle} />
        </div>

        {Body}

        {SaveButton}
      </div>
    );
  }
}

export default index;

const validateForm = Tag => {
  let Reject = true;
  if (Tag.value == "") {
    Reject = false;
  }
  console.log(Tag);
  return Reject;
};
