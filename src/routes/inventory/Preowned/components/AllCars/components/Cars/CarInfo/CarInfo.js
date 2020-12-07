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
        Models: []
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
        Models: []
      };
    }
  }
  async componentDidMount() {
    this.props.getModels();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.models.length != this.props.models.length){
      //reorganize your state models and makes
    }
  }

  handleMake = (event) => {
    let selectedMake = this.props.models.tableData.filter(item => item.value == event.target.value );
    console.log(selectedMake[0].models);
    this.setState({
      selectedMake: selectedMake[0].value,
      selectedMakeId: selectedMake[0].value,
      Models: selectedMake[0].models
    });
  };

  handleModel = (event) => {
    this.setState({
      selectedModel: event.target.value,
      selectedModelId: event.target.value
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
          models={this.state.Models}
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
