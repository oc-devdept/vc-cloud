import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

import Input from "Components/Inventory/Input";
import Text from "Components/Inventory/Text";
import Button from "Components/Inventory/Button";
import StaticName from "Components/Inventory/StaticName";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const TypeOption = ["String", "Number", "Boolean"];

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = keys => {
  let Reject = true;
  // Changed "UNITS OF MEASUREMENT" to unrequired field
  Object.entries(keys).map(([key, value]) => {
    if (value == "" || value == 0) {
      if (key != "unit") {
        Reject = false;
      }
    }
  });
  //   Object.values(keys).map(e => {
  //     console.log(e);
  //     if (e == "" || e == 0) {
  //       Reject = false;
  //     }
  //   });
  return Reject;
};

class index extends PureComponent {
  constructor(props) {
    super(props);

    let Title = "";
    let Button = "";
    let Category = {
      id: "",
      name: "",
      type: ""
    };
    let ProductDetail = {
      name: "",
      unit: "",
      type: ""
    };

    switch (this.props.Action) {
      case "Create":
        Title = "ADD NEW SPECIFICATION";
        Button = "ADD";
        Category = {
          id: this.props.Data[0],
          name: this.props.Data[1]
        };
        break;
      case "Edit":
        Title = "EDIT SPECIFICATION";
        ProductDetail = {
          id: this.props.Data.id,
          name: this.props.Data.name,
          unit: this.props.Data.unit,
          type: this.props.Data.type
        };
        Button = "SAVE CHANGES";
        break;
      case "Delete":
        Title = "DELETE SPECIFICATION";
        ProductDetail = {
          id: this.props.Data.id,
          name: this.props.Data.name,
          unit: this.props.Data.unit,
          type: this.props.Data.type
        };
        Button = "CONFIRM DELETE";
        break;
      default:
        break;
    }

    this.state = {
      Category: Category,
      Title: Title,
      Button: Button,
      ProductDetail: ProductDetail
    };
  }

  _SaveProductDetail = async () => {
    const result = validateForm(this.state.ProductDetail);
    if (result) {
      const ProductDetail = this.state.ProductDetail;
      const productDetailCategoryId = this.state.Category.id;
      await api.post("/productDetails", {
        name: ProductDetail.name,
        unit: ProductDetail.unit,
        type: ProductDetail.type,
        productDetailCategoryId: productDetailCategoryId
      });

      await this.props._SaveProductDetailDone();
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

  _EditProductDetail = async () => {
    const result = validateForm(this.state.ProductDetail);
    if (result) {
      await api.post("/productDetails/editProductDetailValues", {
        data: this.state.ProductDetail
      });
      await this.props._SaveProductDetailDone();
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

  _DeleteProductDetail = async () => {
    const id = this.state.ProductDetail.id;
    await api.delete(`/productDetails/${id}`);
    await this.props._SaveProductDetailDone();
    await this.props._RestartToggle();
  };

  _HandleProduct = (e, element) => {
    let ProductDetail = { ...this.state.ProductDetail };
    ProductDetail[element] = e;
    this.setState({ ProductDetail: ProductDetail });
  };

  _changeType = e => {
    let ProductDetail = { ...this.state.ProductDetail };
    ProductDetail.type = e.target.value;
    this.setState({ ProductDetail: ProductDetail });
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
              paddingBottom: 10,
              justifyContent: "center"
            }}
          >
            <span>
              {`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}
              <br />
              <span style={{ fontWeight: "600" }}>
                YOU CANNOT UNDO THIS ACTION
              </span>{" "}
            </span>

            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Text
                divStyle={{ width: "100%" }}
                title="CAR SPECIFICATION NAME"
                value={this.state.ProductDetail.name}
              />

              <Text
                divStyle={{ width: "100%" }}
                title="UNITS OF MEASUREMENT"
                value={this.state.ProductDetail.unit}
              />

              <Text
                divStyle={{ width: "100%" }}
                title="UNIT TYPE"
                value={this.state.ProductDetail.type}
              />
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
                title="CAR SPECIFICATION ITEM"
                placeholder="Enter specification (e.g Air Bags)"
                value={this.state.ProductDetail.name}
                element={"name"}
                _HandleProduct={this._HandleProduct}
              />

              <Input
                divStyle={{ width: "100%", marginRight: 30 }}
                title="UNITS OF MEASUREMENT"
                placeholder="Enter specification measurement (e.g units / km/h)"
                value={this.state.ProductDetail.unit}
                element={"unit"}
                _HandleProduct={this._HandleProduct}
              />

              <FormControl style={{ width: "100%" }}>
                <StaticName title={"UNIT TYPES"} />
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={
                    this.state.ProductDetail.type
                      ? this.state.ProductDetail.type
                      : ""
                  }
                  onChange={this._changeType}
                  style={{ minWidth: 100, marginLeft: 5 }}
                >
                  {TypeOption.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL CATEGORY</span>
                                <span>{this.state.Category.name}</span>
                            </div> */}
              <Text
                divStyle={{ width: "100%" }}
                title="CAR SPECIFICATION CATEGORY"
                value={this.state.Category.name}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: 30
                }}
              >
                <Input
                  divStyle={{ width: "100%", marginRight: 30 }}
                  title="CAR SPECIFICATION"
                  placeholder="e.g Air Bags"
                  value={this.state.ProductDetail.name}
                  element={"name"}
                  _HandleProduct={this._HandleProduct}
                />

                <Input
                  divStyle={{ width: "100%", marginRight: 30 }}
                  title="UNITS OF MEASUREMENT"
                  placeholder="e.g Units"
                  value={this.state.ProductDetail.unit}
                  element={"unit"}
                  _HandleProduct={this._HandleProduct}
                />

                {/* <Input
                                    divStyle={{width: '100%'}}
                                    title="UNIT TYPES"
                                    placeholder=""
                                    value={this.state.ProductDetail.type}
                                    element={'unit'}
                                    _HandleProduct={this._HandleProduct}
                                />  */}

                <FormControl style={{ width: "100%" }}>
                  <StaticName title={"UNIT TYPES"} />
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={
                      this.state.ProductDetail.type
                        ? this.state.ProductDetail.type
                        : ""
                    }
                    onChange={this._changeType}
                    style={{ minWidth: 100, marginLeft: 5 }}
                  >
                    {TypeOption.map((e, index) => {
                      return (
                        <MenuItem key={index} value={e}>
                          {e}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        );
        break;
    }

    let SaveButton = null;
    switch (this.props.Action) {
      case "Create":
        SaveButton = (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <button onClick={this._SaveProductDetail}>{this.state.Button}</button> */}
            <Button
              _Function={this._SaveProductDetail}
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
            {/* <button onClick={this._EditProductDetail}>{this.state.Button}</button> */}
            <Button
              _Function={this._EditProductDetail}
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
            {/* <button onClick={this._DeleteProductDetail}>{this.state.Button}</button> */}
            <Button
              _Function={this._DeleteProductDetail}
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
