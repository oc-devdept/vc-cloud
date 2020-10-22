import React, { PureComponent } from "react";
import api from "Api";

import { Select, FormControl, MenuItem } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";

import Images from "Components/Image";
import Input from "Components/Inventory/Input";
import StaticName from "Components/Inventory/StaticName";
import Button from "Components/Inventory/Button";

import { NotificationManager } from "react-notifications";

class MakesForm extends PureComponent {
  constructor(props) {
    super(props);

    let Title = "";
    let Button = "";
    let Make = {
      name: "",
      description: "",
      commissionId: ""
    };

    switch (this.props.Action) {
      case "Create":
        Title = "CREATE NEW MAKE";
        Button = "CREATE";
        break;
      case "Edit":
        Title = "EDIT CAR MAKE";
        Make = {
          id: this.props.Data[0],
          name: this.props.Data[1],
          description: this.props.Data[2],
          commissionId: this.props.Data[4] ? this.props.Data[4] : 0
        };
        Button = "SAVE CHANGES";
        break;
      case "Delete":
        Title = "DELETE CAR MAKE";
        Make = {
          id: this.props.Data[0],
          name: this.props.Data[1],
          description: this.props.Data[2],
          commissionId: this.props.Data[4] ? this.props.Data[4] : 0
        };
        Button = "CONFIRM DELETE";
        break;
      default:
        break;
    }

    this.state = {
      Make: Make,
      Title: Title,
      Button: Button,
      images: this.props.Data
        ? this.props.Data[3]
          ? this.props.Data[3]
          : []
        : [],
      files: [],
      MakeId: this.props.MakeId
    };

    this._OnChange = this._OnChange.bind(this);
  }

  removeFile = file => {
    this.setState(state => {
      const index = state.files.indexOf(file);
      const files = state.files.slice(0);
      files.splice(index, 1);
      return { files };
    });
  };

  handleUpload = file => {
    this.setState({
      files: file
    });
  };

  _SaveMake = async () => {
    const { name, description, commissionId } = this.state.Make;
    const files = this.state.files;
    const result = validateForm(this.state.Make, files);

    if (result) {
      var data = new FormData();
      files.map(file => data.append(`upload`, file));
      data.append("name", name);
      data.append("description", description);
      data.append("commissionId", commissionId);
      data.append("categoryGroupId", this.state.MakeId);
      await api.post(`/categories/new`, data);
      await this.props._SaveMakeDone();
      await this.props._RestartToggle();
      NotificationManager.success("Make saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _EditMake = async () => {
    const files = this.state.files;
    const { id, name, description, commissionId } = this.state.Make;
    const images = this.state.images;

    const result = validateForm(this.state.Make, images);
    if (result) {
      var data = new FormData();
      files.map(file => data.append(`upload`, file));
      data.append("id", id);
      data.append("name", name);
      data.append("description", description);
      data.append("commissionId", commissionId);
      await api.post(`/categories/editMakeDetail`, data);
      await this.props._SaveMakeDone();
      await this.props._RestartToggle();
      NotificationManager.success("Make saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _OnChange = (e, element) => {
    let Make = { ...this.state.Make };
    Make[element] = e;
    this.setState({ Make: Make });
  };

  _ChangeComms = e => {
    let Make = { ...this.state.Make };
    Make["commissionId"] = e.target.value;
    this.setState({ Make: Make });
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
            <span>{this.state.Make.name}</span>
          </div>
        );
        break;
      default:
        Body = (
          <div className="d-flex" style={{ flexDirection: "row", flex: 1 }}>
            <div
              className="d-flex flex-column justify-content-between"
              style={{ flex: 1, marginRight: 30 }}
            >
              <div className="d-flex flex-row">
                <Input
                  divStyle={{ width: "100%", marginRight: 30 }}
                  title="CAR MAKE NAME"
                  placeholder="e.g BMW"
                  value={this.state.Make.name}
                  element={"name"}
                  _HandleProduct={this._OnChange}
                />
                <FormControl className="w-100">
                  <StaticName title="CAR COMMISSION (SGD)" />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.Make.commissionId}
                    onChange={this._ChangeComms}
                  >
                    {this.props.CommissionData.map(comm => (
                      <MenuItem dense key={comm.id} value={comm.id}>
                        {`${comm.name} - $${comm.commission}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="d-flex flex-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: 30
                  }}
                >
                  <StaticName title={"CAR MAKE IMAGE"} />
                  {this.state.images.length > 0 && (
                    <Images imageSource={this.state.images} single={true} />
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <StaticName title={"IMAGE UPLOAD"} />
                  <Dropzone
                    onDrop={this.handleUpload}
                    onRemove={this.removeFile}
                    uploadedFiles={this.state.files}
                    additionalText="Files can't be edited once uploaded."
                  />
                </div>
              </div>
            </div>

            <Input
              textarea={true}
              divStyle={{ width: "100%", flex: 1, display: "flex" }}
              title="DESCRIPTION"
              placeholder="Enter description for this make"
              value={this.state.Make.description}
              element={"description"}
              _HandleProduct={this._OnChange}
              style={{
                height: "100%",
                backgroundColor: "rgba(244,246,251,1)",
                borderRadius: 8,
                border: "none",
                padding: 20
              }}
            />
          </div>
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
            _Function={this._SaveMake}
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
            _Function={this._EditMake}
            product={""}
            files={""}
            title={this.state.Button}
          />
        );
        break;

      default:
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

export default MakesForm;

const validateForm = (make, files) => {
  let Reject = true;
  if(make.name == "" || make.description == ""){
    Reject = false;
  }

  if (files.length == 0) {
    Reject = false;
  }

  return Reject;
};
