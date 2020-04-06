import React, { PureComponent, Component } from "react";
import api from "Api";

import ProductDetailsFields from "./components/ProductDetailsFields";
import AddProductOptionFields from "./components/AddProductOptionFields";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductOptionCategories: [],
      productOptionStage: 0,

      addItem: false,
      addItemInformation: null
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadInitial();
  }

  loadInitial = async () => {
    try {
      const ProductOptionCategories = await this._FetchProductDetailCategories();

      if (this._isMounted) {
        this.setState({
          ProductOptionCategories: ProductOptionCategories
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  async _FetchProductDetailCategories() {
    const ProductOptionCategories = await api.get(
      `/productoptioncategories/formFields`
    );
    return ProductOptionCategories.data.fields;
  }

  _RenderCarDetails = () => {
    let productOptionStage = this.state.productOptionStage;
    let ProductOptionCategories = this.state.ProductOptionCategories;

    let Options = this.props.Car ? this.props.Car : [];
    let BelongsTo = [];

    if (Options.length > 0) {
      Options.map(e => {
        // console.log(e.productOption.productOptionCategoryId, ProductOptionCategories[productOptionStage].value, e.productOption.productOptionCategoryId == ProductOptionCategories[productOptionStage].value)
        if (
          e.productOption.productOptionCategoryId ==
          ProductOptionCategories[productOptionStage].id
        ) {
          BelongsTo.push(e);
        }
      });
    }

    if (BelongsTo.length > 0) {
      return (
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "rgba(73,100,150,1)",
              padding: 10,
              marginTop: 10
            }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ color: "white" }}>NAME</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                flex: 1
              }}
            >
              <div>
                <span style={{ color: "white" }}>IMAGE</span>
              </div>
              <div>
                <span style={{ color: "white" }}>PRICE</span>
              </div>
              <div>
                <span style={{ color: "white" }}>SET DEFAULT</span>
              </div>
              {/* <div>
                            <span style={{color:"white"}}>EDIT</span>
                            </div> */}
              <div>
                <span style={{ color: "white" }}>DELETE</span>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingBottom: 10,
              borderBottom: "1px solid rgba(0,0,0,0.70)"
            }}
          >
            {BelongsTo.map((e, index) => {
              return (
                <div key={index} style={{}}>
                  <ProductDetailsFields
                    Fields={e.productOption}
                    isDefault={!!e.isDefault ? e.isDefault : false}
                    Id={e.id}
                    index={index}
                    _DeleteProductOptionFields={
                      this.props._DeleteProductOptionFields
                    }
                    _HandleProductDetailValue={e =>
                      this.props._HandleProductDetailValue(
                        e.target.value,
                        "value",
                        index
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "rgba(73,100,150,1)",
            padding: 10,
            marginTop: 10
          }}
        >
          <div style={{ flex: 1 }}>
            <span style={{ color: "white" }}>NAME</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flex: 1
            }}
          >
            <div>
              <span style={{ color: "white" }}>IMAGE</span>
            </div>
            <div>
              <span style={{ color: "white" }}>PRICE</span>
            </div>
            <div>
              <span style={{ color: "white" }}>SET DEFAULT</span>
            </div>
            {/* <div>
                        <span style={{color:"white"}}>EDIT</span>
                        </div> */}
            <div>
              <span style={{ color: "white" }}>DELETE</span>
            </div>
          </div>
        </div>
      );
    }
  };

  _HandleAddNewItem = item => {
    this.setState({ addItem: true, addItemInformation: item });
  };

  _HandleSaveProductOption = async (e, isDefault) => {
    await this.props._HandleSaveProductOption(e, isDefault);
    this.setState({ addItem: false, addItemInformation: null });
  };

  _HandleCancelProductOption = () => {
    this.setState({ addItem: false, addItemInformation: null });
  };

  render() {
    const Car = this.props.Car;

    if (!Car) {
      return null;
    }

    return (
      <div
        className="d-flex"
        style={{ flexDirection: "column", position: "relative", marginTop: 20 }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            position: "relative"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {this.state.ProductOptionCategories.map((e, index) => {
              let fontStyle = {};
              let style = {};
              if (this.state.productOptionStage == index) {
                fontStyle = { color: "rgba(244,132,33,1)" };
                style = {
                  padding: 5,
                  borderBottom: "1.5px solid rgba(244,132,33,1)"
                };
              } else {
                fontStyle = { color: "rgba(0,0,0,0.6)" };
                style = { padding: 5 };
              }

              return (
                <div
                  key={index}
                  style={style}
                  onClick={() =>
                    this.setState({
                      productOptionStage: index,
                      addItemInformation: null,
                      addItem: false
                    })
                  }
                >
                  <span style={fontStyle}>{e.name}</span>
                </div>
              );
            })}
          </div>

          {this.state.ProductOptionCategories.length > 0 && (
            <div style={{ flex: 1, height: "100%" }}>
              {this._RenderCarDetails()}
            </div>
          )}

          {this.props.ProductOptionLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "red",
                borderRadius: 10,
                opacity: 0.25
              }}
            >
              ProductOptionLoading
            </div>
          )}
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ paddingBottom: 20, paddingTop: 20 }}>
            <span>ADD A NEW CAR PRODUCT ITEM BELOW</span>
          </div>

          {this.state.ProductOptionCategories.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Please select the Car Product Item below</span>

              <div
                className="d-flex flex-wrap"
                style={{
                  flexDirection: "column",
                  marginTop: 10,
                  overflow: "auto"
                }}
              >
                {this.state.ProductOptionCategories[
                  this.state.productOptionStage
                ].objects.map((each, indexes) => {
                  let contain = false;

                  if (Car) {
                    if (Car.length > 0) {
                      Car.map(e => {
                        if (each) {
                          if (e.productOption.id == each.id) {
                            contain = true;
                          }
                        }
                      });
                    }
                  }

                  let style = {};

                  if (each) {
                    if (contain) {
                      style = {
                        border: "1px solid black",
                        borderRadius: 5,
                        marginRight: 20,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 2.5,
                        paddingBottom: 2.5,
                        opacity: 0.3,
                        marginBottom: 2.5,
                        marginTop: 2.5
                      };
                      return (
                        <div key={indexes} style={style}>
                          {each.name} {each.price}SGD
                        </div>
                      );
                    } else {
                      if (this.state.addItemInformation) {
                        if (this.state.addItemInformation.id == each.id) {
                          style = {
                            backgroundColor: "rgba(74,74,74,1.0)",
                            color: "white",
                            borderRadius: 5,
                            marginRight: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 2.5,
                            paddingBottom: 2.5,
                            marginBottom: 2.5,
                            marginTop: 2.5
                          };
                        } else {
                          style = {
                            border: "1px solid black",
                            borderRadius: 5,
                            marginRight: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 2.5,
                            paddingBottom: 2.5,
                            marginBottom: 2.5,
                            marginTop: 2.5
                          };
                        }
                      } else {
                        style = {
                          border: "1px solid black",
                          borderRadius: 5,
                          marginRight: 20,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 2.5,
                          paddingBottom: 2.5,
                          marginBottom: 2.5,
                          marginTop: 2.5
                        };
                      }

                      return (
                        <div
                          onClick={() => this._HandleAddNewItem(each)}
                          key={indexes}
                          style={style}
                        >
                          {each.name} {each.price}SGD
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </div>
          )}
        </div>

        {this.state.addItem && (
          <AddProductOptionFields
            Fields={this.state.addItemInformation}
            _HandleSaveProductOption={this._HandleSaveProductOption}
            _HandleCancelProductOption={this._HandleCancelProductOption}
          />
        )}
      </div>
    );
  }
}
