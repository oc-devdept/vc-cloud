import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import { Add, Remove } from "@material-ui/icons";

import api from "Api";
import BgCard from "Components/BgCard";

import ProductDetail from "./ProductDetail/index";

import CarInfo from "./CarInfo/CarInfo";

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = (Product, Files, Images) => {
  let Reject = true;
  const {
    name,
    sku,
    description,
    product_code,
    cost_Price,
    selling_Price
  } = Product;
  if (name == "") {
    Reject = false;
  }
  if (description == "") {
    Reject = false;
  }
  if (cost_Price == "") {
    Reject = false;
  }
  if (selling_Price == "") {
    Reject = false;
  }
  if (Files.length == 0) {
    Reject = false;
  }
  if(Images.length == 0){
    Reject = false;
  }
  return Reject;
};

const validateEditForm = Product => {
  let Reject = true;
  const { name, description, cost_Price, selling_Price } = Product;
  if (name == "") {
    Reject = false;
  }
  if (description == "") {
    Reject = false;
  }
  if (cost_Price == "") {
    Reject = false;
  }
  if (selling_Price.length == 0) {
    Reject = false;
  }
  return Reject;
};

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Car: null,

      ProductDetailLoading: false,
      ProductOptionLoading: false,
      ProductVariantLoading: false,

      stage: null
    };
  }

  async componentDidMount() {
    if (this.props.GradeId) {
      await this.setState({ loading: true });
      const Car = await this._FetchGrade();
      await this.setState({ loading: false, Car: Car });
    }
  }

  _FetchGrade = async () => {
    const test = await api.get(
      `/products/specificOneGrade/${this.props.GradeId}`
    );
    return test.data.fields;
  };

  _CreateProduct = async (Product, Files, Images) => {
    const result = validateForm(Product, Files, Images);

    if (result) {
      const MakeId = this.props.MakeId;
      const ModelId = this.props.ModelId;
      var data = new FormData();

      Files.map(file => data.append(`upload`, file));
      Images.map(img => data.append('thumb', img));
      data.append("name", Product.name);
      data.append("description", Product.description);
      data.append("cost_Price", Product.cost_Price);
      data.append("selling_Price", Product.selling_Price);
      data.append("isActive", Product.isActive);
      data.append("categoryId", ModelId);
      data.append("categoryGroupId", MakeId);

      const result = await api.post("/products/new", data);
      await this.props._FetchProductsAPI();
      await this.setState({ Car: result.data.data });

      NotificationManager.success("Car product saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _EditProduct = async (Product, Files, Images) => {
    const result = validateEditForm(Product);

    if (result) {
      await this.setState({ loading: true });
      const ModelId = this.props.ModelId;
      const MakeId = this.props.MakeId;

      var data = new FormData();
      Files.map(file => data.append(`upload`, file));
      Images.map(img => data.append('thumb', img));
      data.append("id", Product.id);
      data.append("name", Product.name);
      data.append("description", Product.description);
      data.append("cost_Price", Product.cost_Price);
      data.append("selling_Price", Product.selling_Price);
      data.append("isActive", Product.isActive);
      data.append("isFeature", Product.isFeature);
      data.append("categoryId", ModelId);
      data.append("categoryGroupId", MakeId);

      await api.post(`/products/editProductDetail/`, data);

      await this.props._FetchProductsAPI();
      const Car = await this._FetchGrade();
      await this.setState({ loading: false, Car: Car });

      NotificationManager.success("Car product saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  // Product Detail
  _AddCarDetail = productDetail => {
    let Car = { ...this.state.Car };
    Car.productDetail.push(productDetail);
    this.setState({ Car: Car });
  };

  _SaveCarDetail = async e => {
    if (e.value != "" || e.value != 0) {
      let Car = { ...this.state.Car };

      await this.setState({ ProductDetailLoading: true });

      await api.post(`/productDetailValues`, {
        value: e.value,
        detailCategoryId: e.id,
        productDetailCategoryId: e.productDetailCategoryId,
        productId: Car.id
      });

      const latestProduct = await api.get(`/products/${Car.id}`);
      this.setState({ Car: latestProduct.data });
      await this.setState({ ProductDetailLoading: false });

      NotificationManager.success("Car product saved successfully");
    } else {
      NotificationManager.error(
        "Missing input in your form, please fill up the necessary boxes."
      );
    }
  };

  _HandleProductDetailValue = (targetValue, element, index) => {
    let Car = { ...this.state.Car };
    Car.productDetail[index].value = targetValue;
    this.setState({ Car: Car });
  };

  _DeleteProductDetailFields = async index => {
    await this.setState({ ProductDetailLoading: true });

    let Car = { ...this.state.Car };

    const result = await api.delete(`/productDetailValues/${index}`);

    if (result.data.count == 1) {
      const latestProduct = await api.get(`/products/${Car.id}`);
      this.setState({ Car: latestProduct.data, ProductDetailLoading: false });
    } else {
      this.setState({ ProductDetailLoading: false });
    }
  };

  // Product Options
  _HandleSaveProductOption = async (e, isDefault) => {
    await this.setState({ ProductOptionLoading: true });
    let Car = { ...this.state.Car };

    const data = {
      productId: Car.id,
      productOptionId: e.id,
      isDefault: isDefault
    };

    await api.post(`/products/productOption`, { data: data });
    // await api.post(`/products/${Car.id}/productOption`, e)

    const latestProduct = await api.get(`/products/${Car.id}`);

    this.setState({ Car: latestProduct.data, ProductOptionLoading: false });
  };

  _DeleteProductOptionFields = async index => {
    await this.setState({ ProductOptionLoading: true });

    let Car = { ...this.state.Car };

    const data = {
      id: index
    };

    const result = await api.post(`/products/productOptionDeletion`, {
      data: data
    });

    if (result.data.fields) {
      const latestProduct = await api.get(`/products/${Car.id}`);
      await this.setState({
        Car: latestProduct.data,
        ProductOptionLoading: false
      });
    } else {
      await this.setState({ ProductOptionLoading: false });
    }
  };

  _RenderStage = stage => {
    if (this.state.stage != stage) {
      this.setState({ stage: stage });
    } else {
      this.setState({ stage: null });
    }
  };

  render() {
    const Car = this.state.Car;

    return (
      <div>
        {this.state.loading && <div>Loading ....</div>}

        {!this.state.loading && (
          <div>
            <div style={{ marginBottom: 50 }}>
              <CarInfo
                Car={this.state.Car}
                _CreateProduct={this._CreateProduct}
                _EditProduct={this._EditProduct}
              />
            </div>

            {Car && (
              <div>
                <BgCard
                  fullBlock
                  customStyles={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    marginBottom: 50
                  }}
                >
                  <div
                    className="d-flex"
                    style={{ paddingRight: 20 }}
                    onClick={() => this._RenderStage(1)}
                  >
                    <span style={{ flex: 1, textAlign: "center" }}>
                      CAR DETAILS
                    </span>
                    {this.state.stage != 1 && (
                      <Add
                        fontSize="small"
                        style={{ color: "rgba(0, 0, 0, 0.8)" }}
                      />
                    )}
                    {this.state.stage == 1 && (
                      <Remove
                        fontSize="small"
                        style={{ color: "rgba(0, 0, 0, 0.8)" }}
                      />
                    )}
                  </div>

                  {this.state.stage == 1 && (
                    <ProductDetail
                      Car={Car.productDetailValue}
                      _AddCarDetail={this._AddCarDetail}
                      _SaveCarDetail={this._SaveCarDetail}
                      _HandleProductDetailValue={this._HandleProductDetailValue}
                      _DeleteProductDetailFields={
                        this._DeleteProductDetailFields
                      }
                      ProductDetailLoading={this.state.ProductDetailLoading}
                    />
                  )}
                </BgCard>
              </div>
            )}

            {!Car && (
              <BgCard
                fullBlock
                customStyles={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  marginBottom: 50
                }}
              >
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <span style={{}}>
                    Create your grade before adding Product Detail
                  </span>
                </div>
              </BgCard>
            )}
          </div>
        )}
      </div>
    );
  }
}
