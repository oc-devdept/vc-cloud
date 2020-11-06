import React, { PureComponent, Component } from "react";
import api from "Api";
import { connect } from "react-redux";
import CarInfo from "./Components/index";
import Button from "Components/Inventory/Button";
import { TheatersOutlined } from "@material-ui/icons";

import { getModels } from "Ducks/cms";

class Index extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.Car) {
      this.state = {
        Product: this.props.Car,
        Images: this.props.Car.files,
        Thumbs: this.props.Car.images,
        files: [],
        imgThumbs: [],
        makes: this.props.makes,
        selectedMake: "",
        selectedMakeId: "",
        selectedModel: "",
        selectedModelId: "",
      };
    } else {
      this.state = {
        Product: {
          name: "",
          sku: "",
          description: "",
          product_code: "",
          cost_Price: "",
          selling_Price: "",
          isActive: true,
          isFeature: false,
        },
        Images: [],
        files: [],
        Thumbs: [],
        imgThumbs: [],
        makes: this.props.makes,
        selectedMake: "",
        selectedMakeId: "",
        selectedModel: "",
        selectedModelId: "",
      };
    }
  }
  async componentDidMount() {
    this.props.getModels();
  }
  handleMake = (event) => {
    // console.log("Handle amke");
    // console.log(event.target.value)
    this.setState({
      selectedMake: event.target.value.name,
      selectedMakeId: event.target.value.id,
    });
  };

  handleModel = (event) => {
    // console.log("Handle model");
    // console.log(event.target.value)
    this.setState({
      selectedModel: event.target.value.name,
      selectedModelId: event.target.value.value,
    });
  };
  _HandleProduct = (e, element) => {
    let Product = { ...this.state.Product };

    if (element == "isActive") {
      Product.isActive = !Product.isActive;
      this.setState({ Product: Product });
    } else if (element == "isFeature") {
      Product.isFeature = !Product.isFeature;
      this.setState({ Product: Product });
    } else {
      Product[element] = e;
      this.setState({ Product: Product });
    }
  };

  removeFile = (file) => {
    this.setState((state) => {
      const index = state.files.indexOf(file);
      const files = state.files.slice(0);
      files.splice(index, 1);
      return { files };
    });
  };

  removeFile = (file) => {
    this.setState((state) => {
      const index = state.imgThumbs.indexOf(file);
      const files = state.imgThumbs.slice(0);
      files.splice(index, 1);
      return { imgThumbs: files };
    });
  };

  handleUpload = (file) => {
    this.setState({
      files: file,
    });
  };

  handleThumbUpload = (file) => {
    this.setState({
      imgThumbs: file,
    });
  };

  _AddItem = () => {
    console.log(this.state.selectedMake);
    console.log(this.state.selectedMakeId);
    console.log(this.state.selectedModel);

    console.log(this.state.selectedModelId);
    this.props._CreateProduct(this.state.Product, this.state.files, this.state.imgThumbs, this.state.selectedMakeId, this.state.selectedModelId);
  };

  _EditItem = () => {
    this.props._EditProduct(this.state.Product, this.state.files, this.state.imgThumbs);
  };

  render() {
    return (
      <div style={{}}>
        <h1 style={{ textAlign: "center" }}>GENERAL CAR INFORMATION</h1>

        <CarInfo
          handleMake={this.handleMake}
          _HandleProduct={this._HandleProduct}
          Product={this.state.Product}
          Images={this.state.Images}
          files={this.state.files}
          handleUpload={this.handleUpload}
          removeFile={this.removeFile}
          Thumbs={this.state.Thumbs}
          imgThumbs={this.state.imgThumbs}
          handleThumbUpload={this.handleThumbUpload}
          removeThumb={this.removeThumb}
          makes={this.state.makes}
          selectedMake={this.state.selectedMake}
          models={this.props.models.tableData}
          selectedModel={this.state.selectedModel}
          handleModel={this.handleModel}
        />

        {!this.props.Car && (
          <div className="d-flex" style={{ marginTop: 20, justifyContent: "flex-end" }}>
            <Button _Function={this._AddItem} product={""} files={""} title={"SAVE CHANGES"} />
            {/* <button onClick={() => this.props._CreateProduct(this.state.Product, this.state.files)}>SAVE CHANGES</button>      */}
          </div>
        )}

        {this.props.Car && (
          <div className="d-flex" style={{ marginTop: 20, justifyContent: "flex-end" }}>
            {/* <button onClick={() => this.props._EditProduct(this.state.Product, this.state.files)}>EDIT CHANGES</button>    */}
            <Button _Function={this._EditItem} product={""} files={""} title={"SAVE CHANGES"} />
          </div>
        )}
        {console.log("THIS IS CAR INFO ")}
                {console.log(this.props)}
    {console.log(this.state)}
      </div>
    );
  }
}
const mapStateToProps = ({ cmsState }) => {
  const { carState } = cmsState;
  const { models } = carState;
  return { models };
};
export default connect(mapStateToProps, { getModels })(Index);
