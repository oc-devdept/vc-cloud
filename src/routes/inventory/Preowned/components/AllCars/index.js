import React, { PureComponent } from "react";
import { NotificationManager } from "react-notifications";
import api from "Api";
import { connect } from "react-redux";
import CarList from "./components/CarList";
import CarGradeList from "./components/CarGradeList";
import DialogRoot from "Components/Dialog/DialogRoot";

import Grade from "./components/Cars/Grade";
import { getMakes } from "Ducks/cms";
import { getAllPreownedProducts } from "Ducks/inventory";
class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
      makes: [],
      loading: true,
      toggle: false,
      element: null,
      groupName: null,
      data: null,
    };
  }

  async componentDidMount() {
    // const MakeFilter = await api.get(`categorygroups/findOne?filter[where][name]=Make&`);
    this.props.getMakes();
    this.props.getAllPreownedProducts();
    var MakeSource = await api.get(`/categories/getMakeCategory`);
    var makes = MakeSource.data.fields.map((make) => {
      return {
        name: make.name,
      };
    });
    try {
      this.setState({
        makes: this.props.makes.tableData,
      });
      //await this._FetchProductsAPI();
    } catch (e) {
      this.setState({ Products: [], loading: false });
    }
  }
/*
  _FetchProductsAPI = async () => {
    try {
      const ModelGrade = await api.get(`categories/ModelGrade`);
      let product = [];
      ModelGrade.data.fields.forEach((element) => {
        var productModel = element.name;
        element.product.forEach((element) => {
          if (element.type == "preowned") {
            element.model = productModel;
            product.push(element);
          }
        });
      });

      return this.setState({
        Products: product, //ModelGrade.data.fields
        loading: false,
      });
    } catch (e) {
      console.log("error", e);
      this.setState({ loading: false });
    }
  };
*/
  _DeleteCar = async (id) => {
    await api.post(`products/deleteSpecificProductGrade`, { data: id });
    this.props.getAllPreownedProducts();
    //await this._FetchProductsAPI();
    NotificationManager.success("You have successfully deleted a grade");
  };

  _RenderDialog = () => {
    if (this.state.toggle) {
      switch (this.state.element) {
        case "Add_Grade":
          const MakeId = this.state.data.MakeId;
          const ModelId = this.state.data.ModelId;

          return (
            <DialogRoot
              // title={title}

              show={this.state.toggle}
              handleHide={this._RestartToggle}
              size={"md"}
            >
              <Grade MakeId={MakeId} ModelId={ModelId} _FetchProductsAPI={this._FetchProductsAPI} makes={this.props.makes.tableData} />
            </DialogRoot>
          );

        case "Selected_Grade":
          return (
            <DialogRoot
              // title={"Select Grade"}
              size="md"
              show={this.state.toggle}
              handleHide={this._RestartToggle}
            >
              <Grade MakeId={MakeId} ModelId={ModelId} GradeId={this.state.groupName} _FetchProductsAPI={this._FetchProductsAPI} makes={this.props.makes.tableData} />
            </DialogRoot>
          );
        default:
          return null;
      }
    }
  };

  _RestartToggle = () => {
    this.setState({
      toggle: false,
      element: null,
      groupName: null,
      data: null,
    });
  };

  ToggleDialog = (element, groupName, data, makes) => {
    // console.log("im ghere");
    // console.log(element);
    // console.log(groupName);
    // console.log(makes);
    this.setState({
      element: element,
      toggle: !this.state.toggle,
      groupName: groupName,
      data: data,
      makes: makes,
    });
  };

  render() {
    const { makes } = this.state;
    return (
      <div style={{ marginTop: 10, marginBottom: 50 }}>
        
        <CarGradeList
          title={"ALL PREOWNED CARS"}
          loading={this.state.loading}
          tableData={this.props.preownedProductList.tableData}
          borderRadius={"0px"}
          boxShadow={"none"}
          ToggleDialog={this.ToggleDialog}
          DeleteCar={this._DeleteCar}
          makes={makes}
        />
        {this._RenderDialog()}
        {/* {console.log("PREOWNED")}
        {console.log(this.props)}
        {console.log(this.state.Products)} */}
      </div>
    );
  }
}

// export default index;
const mapStateToProps = ({ cmsState, inventoryState }) => {
  const { carState } = cmsState;
  const { makes } = carState;
  const { preownedProductList } = inventoryState;
  return { makes, preownedProductList };
};
export default connect(mapStateToProps, { getMakes, getAllPreownedProducts })(index);
