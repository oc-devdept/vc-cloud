import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";
import Image from "Components/Image";

const Option = [true, false];

import Input from "Components/Inventory/Input";
import Text from "Components/Inventory/Text";
import Button from "Components/Inventory/Button";
import StaticName from "Components/Inventory/StaticName";

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = (key, files) => {
  let Reject = true;
  const { name, description } = key;
  if (name == "") {
    Reject = false;
  }
  if (description == "") {
    Reject = false;
  }
  if (files.length == 0) {
    Reject = false;
  }
  return Reject;
};

class index extends PureComponent {
  constructor(props) {
    super(props);

    let Title = "";
    let Button = "";
    let Category = {
      id: "",
      selectOne: "",
      name: ""
    };

    let Item = {
      id: "",
      name: "",
      description: "",
      editable: false,
      isDefault: false,
      image: [],
      price: 0
    };

    switch (this.props.Action) {
      case "Create":
        Title = "ADD NEW EQUIPMENT";
        Button = "ADD";
        Category = {
          id: this.props.Data.id,
          selectOne: this.props.Data.selectOne,
          name: this.props.Data.name
        };
        break;
      case "Edit":
        Title = "EDIT EQUIPMENT";
        Button = "SAVE CHANGES";
        Item = {
          id: this.props.Data.id,
          name: this.props.Data.name,
          editable: this.props.Data.editable,
          description: this.props.Data.description,
          image: this.props.Data.image,
          isDefault: this.props.Data.isDefault,
          price: this.props.Data.price
        };
        break;
      case "Delete":
        Title = "DELETE EQUIPMENT";
        Button = "CONFIRM DELETE";
        Item = {
          id: this.props.Data.id,
          name: this.props.Data.name,
          editable: this.props.Data.editable,
          description: this.props.Data.description,
          image: this.props.Data.image,
          isDefault: this.props.Data.isDefault,
          price: this.props.Data.price
        };
        break;
      default:
        break;
    }

    this.state = {
      Category: Category,
      Title: Title,
      Button: Button,
      Item: Item,
      files: [],
      images: []
    };
  }

  _SaveProductOption = async () => {
    const result = validateForm(this.state.Item, this.state.files, this.state.images);
    if (result) {
      const ProductOption = this.state.Item;
      const productOptionCategoryId = this.state.Category.id;

      var data = new FormData();
      const files = this.state.files;
      const thumbnails = this.state.images;

      files.map(file => data.append(`upload`, file));
      thumbnails.map(image => data.append(`uploadThumbnail`, image));
      data.append("name", ProductOption.name);
      data.append("description", ProductOption.description);
      data.append("editable", ProductOption.editable);
      data.append("isDefault", ProductOption.isDefault);
      data.append("price", ProductOption.price);
      data.append("productOptionCategoryId", productOptionCategoryId);
      console.log("HERE")
      console.log(data);
      await api.post("/productoptions/new", data);

      await this.props._CreateProductCategoryDone();
      await this.props._RestartToggle();

      NotificationManager.success(
        "Product specification item saved successfully"
      );
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _EditProductOptionValue = async () => {
    const result = validateForm(this.state.Item, this.state.files);
    if (result) {
      const ProductOption = this.state.Item;
      var data = new FormData();
      const files = this.state.files;
      const thumbnails = this.state.images;

      files.map(file => data.append(`upload`, file));
      thumbnails.map(image => data.append(`uploadThumbnail`, image));
      data.append("name", ProductOption.name);
      data.append("editable", ProductOption.editable);
      data.append("description", ProductOption.description);
      data.append("isDefault", ProductOption.isDefault);
      data.append("price", ProductOption.price);
      data.append("id", ProductOption.id);

      await api.post("/productoptions/editProductOptionValue", data);

      await this.props._CreateProductCategoryDone();
      await this.props._RestartToggle();

      NotificationManager.success(
        "Product specification item saved successfully"
      );
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _DeleteProductOptionValue = async () => {
    const { id } = this.state.Item;
    await api.delete(`/productoptions/${id}`);

    await this.props._CreateProductCategoryDone();
    await this.props._RestartToggle();
  };

  _ToggleItemEditable = item => {
    let Item = { ...this.state.Item };
    Item.editable = item;
    this.setState({ Item: Item });
  };

  _ToggleItemIsDefault = item => {
    let Item = { ...this.state.Item };
    Item.isDefault = item;
    this.setState({ Item: Item });
  };

  removeFile = file => {
    this.setState(state => {
      const index = state.files.indexOf(file);
      const files = state.files.slice(0);
      files.splice(index, 1);
      return { files };
    });
  };
  removeThumbFile = file => {
    this.setState(state => {
      const index = state.images.indexOf(file);
      const images = state.images.slice(0);
      images.splice(index, 1);
      return { images };
    });
  };

  handleUpload = file => {
    this.setState({
      files: file
    });
  };

  handleThumbUpload = file => {
    this.setState({
      images: file
    });
  };
  _HandleProduct = (e, element) => {
    let Item = { ...this.state.Item };
    Item[element] = e;
    this.setState({ Item: Item });
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
                <br />
                <span style={{ fontWeight: "600" }}>
                  YOU CANNOT UNDO THIS ACTION
                </span>
              </span>
              <span>{this.state.Category.name}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Text
                divStyle={{ width: "100%", marginRight: 30 }}
                title="CAR EQUIPMENT ITEM"
                value={this.state.Item.name}
              />

              <Text
                divStyle={{ width: "100%" }}
                title="PRICE"
                value={this.state.Item.price}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Text
                divStyle={{ width: "100%" }}
                title="DESCRIPTION"
                value={this.state.Item.description}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginRight: 30
                }}
              >
                <StaticName title={"CURRENT IMAGE"} />
                {this.state.Item.image.length > 0 && (
                  <Image imageSource={this.state.Item.image} single={true} />
                )}
              </div>

              <div
                style={{
                  display: "none",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span>ITEM EDITABLE</span> */}
                  <StaticName title={"ITEM EDITABLE"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const editable = this.state.Item.editable;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (editable == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div key={item} style={style}>
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span>ITEM DEFAULT SET</span> */}
                  <StaticName title={"ITEM DEFAULT SET"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const isDefault = this.state.Item.isDefault;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (isDefault == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div key={item} style={style}>
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case "Edit":
        Body = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Input
                divStyle={{ width: "100%", marginRight: 30 }}
                title="CAR EQUIPMENT ITEM"
                placeholder="(e.g Bose Speaker Model Xl)"
                value={this.state.Item.name}
                element={"name"}
                _HandleProduct={this._HandleProduct}
              />

              <Input
                divStyle={{ width: "100%" }}
                title="PRICE"
                placeholder="Enter the price here"
                value={this.state.Item.price}
                element={"price"}
                type="number"
                _HandleProduct={this._HandleProduct}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Input
                divStyle={{ width: "100%" }}
                title="CAR EQUIPMENT ITEM DESCRIPTION"
                placeholder="Enter a new Car Product Option Item description"
                value={this.state.Item.description}
                element={"description"}
                _HandleProduct={this._HandleProduct}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginRight: 30
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  <StaticName title={"CURRENT IMAGE"} />
                  {this.state.Item.image.length > 0 && (
                    <Image imageSource={this.state.Item.image} single={true} />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  <StaticName title={"UPLOAD NEW IMAGE"} />
                  <Dropzone
                    onDrop={this.handleUpload}
                    onRemove={this.removeFile}
                    uploadedFiles={this.state.files}
                    additionalText="Files can't be edited once uploaded."
                  />
                </div>

                {/* THUMBNAIL HERE ================= */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  <StaticName title={"CURRENT THUMBNAIL"} />
                  {this.state.Item.image.length > 0 && (
                    <Image imageSource={this.state.Item.image} single={true} />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  <StaticName title={"UPLOAD NEW THUMBNAIL "} />
                  <Dropzone
                    onDrop={this.handleThumbUpload}
                    onRemove={this.removeThumbFile}
                    uploadedFiles={this.state.images}
                    additionalText="Files can't be edited once uploaded."
                  />
                </div>
              </div>
              <div
                style={{
                  display: "none",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span>IS THE ITEM EDITABLE</span> */}
                  <StaticName title={"IS THE ITEM EDITABLE"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const editable = this.state.Item.editable;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (editable == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div
                          key={item}
                          onClick={() => this._ToggleItemEditable(e)}
                          style={style}
                        >
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span>IS THE ITEM DEFAULT SET</span> */}
                  <StaticName title={"IS THE ITEM DEFAULT SET"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const isDefault = this.state.Item.isDefault;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (isDefault == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div
                          key={item}
                          onClick={() => this._ToggleItemIsDefault(e)}
                          style={style}
                        >
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      default:
        Body = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <Text
              divStyle={{ width: "100%" }}
              title="ADD NEW EQUIPMENT"
              value={this.state.Category.name}
            />

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Input
                divStyle={{ width: "100%", marginRight: 30 }}
                title="EQUIPMENT ITEM"
                placeholder="Enter a new equipment name (e.g Bose Speaker Model Xl)"
                value={this.state.Item.name}
                element={"name"}
                _HandleProduct={this._HandleProduct}
              />

              <Input
                divStyle={{ width: "100%" }}
                title="PRICE"
                placeholder="Enter the price here"
                value={this.state.Item.price}
                element={"price"}
                _HandleProduct={this._HandleProduct}
                type="number"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Input
                divStyle={{ width: "100%" }}
                title="EQUIPMENT DESCRIPTION"
                placeholder="Enter a equipment description"
                value={this.state.Item.description}
                element={"description"}
                _HandleProduct={this._HandleProduct}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <div

                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: 30
                }}
              >
                {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>IMAGE UPLOAD</span> */}
               <div className="col align-items-center">
                <StaticName title={"IMAGE UPLOAD"} />
                <Dropzone
                  onDrop={this.handleUpload}
                  onRemove={this.removeFile}
                  uploadedFiles={this.state.files}
                  additionalText="Files can't be edited once uploaded."
                />
                </div>
                <div className="col align-items-center">
                <StaticName title={"THUMBNAIL UPLOAD"} />
                <Dropzone
                  onDrop={this.handleThumbUpload}
                  onRemove={this.removeThumbFile}
                  uploadedFiles={this.state.images}
                  additionalText="Files can't be edited once uploaded."
                />
                   </div>
              </div>
          

              <div
                style={{ display: "none", flexDirection: "column", flex: 1 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>IS THE ITEM EDITABLE</span> */}
                  <StaticName title={"IS THE ITEM EDITABLE"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const editable = this.state.Item.editable;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (editable == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div
                          key={item}
                          onClick={() => this._ToggleItemEditable(e)}
                          style={style}
                        >
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    flex: 1
                  }}
                >
                  {/* <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>IS THE ITEM DEFAULT SET</span> */}
                  <StaticName title={"IS THE ITEM DEFAULT SET"} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Option.map((e, item) => {
                      const isDefault = this.state.Item.isDefault;

                      let style = {
                        margin: 5,
                        padding: 5,
                        border: "1px solid black",
                        width: 80,
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center"
                      };

                      if (isDefault == e) {
                        style = {
                          margin: 5,
                          padding: 5,
                          border: "1px solid black",
                          width: 80,
                          borderRadius: 8,
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.8)"
                        };
                      }

                      return (
                        <div
                          key={item}
                          onClick={() => this._ToggleItemIsDefault(e)}
                          style={style}
                        >
                          {`${e}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {console.log(this.state)}
          </div>
        );
        break;
    }

    let SaveButton = null;
    switch (this.props.Action) {
      case "Create":
        SaveButton = (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <button onClick={this._SaveProductOption}>{this.state.Button}</button> */}
            <Button
              _Function={this._SaveProductOption}
              product={""}
              files={""}
              title={this.state.Button}
            />
          </div>
        );
        break;

      case "Edit":
        SaveButton = (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <button onClick={this._EditProductOptionValue}>{this.state.Button}</button> */}
            <Button
              _Function={this._EditProductOptionValue}
              product={""}
              files={""}
              title={this.state.Button}
            />
          </div>
        );
        break;
      default:
        SaveButton = (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <button onClick={this._DeleteProductOptionValue}>{this.state.Button}</button> */}
            <Button
              _Function={this._DeleteProductOptionValue}
              product={""}
              files={""}
              title={this.state.Button}
            />
          </div>
        );
        break;
    }

    return (
      <div className="d-flex" style={{ flexDirection: "column", flex: 1 }}>
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
