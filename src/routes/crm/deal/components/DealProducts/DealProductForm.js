import React, { Component } from "react";
import { connectModal } from "redux-modal";
import { connect } from "react-redux";

import DialogRoot from "Components/Dialog/DialogRoot";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Inputs
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListSubheader
} from "@material-ui/core";

// Actions
import {
  getGrades,
  getExterior,
  getInterior,
  getAccessories
} from "Ducks/configurator";

const initState = {
  price: 0,
  tax: 0,
  paid: false,
  productVariantValueIds: [],
  productOptionIds: [],
  productId: "",
  exterior: "",
  interior: "",
  rims: ""
};

class DealProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.onSelectGrade = this.onSelectGrade.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGrades();
  }

  updatePrice(amount) {
    var price = this.state.price;
    price += amount;
    this.setState({ price });
  }

  /**
   * Select Functions
   */
  onSelectGrade(id) {
    if (id) {
      this.setState({ ...initState, productId: id });
      this.props.getExterior(id);
      this.props.getInterior(id);
      this.props.getAccessories(id);
    }
  }
  onSelectOptions(productOptionIds) {
    this.setState({ productOptionIds });
  }
  onSelectVariants(id, type) {
    var productVariantValueIds = Object.assign(
      [],
      this.state.productVariantValueIds
    );
    productVariantValueIds.push(id);
    this.setState({ productVariantValueIds, [type]: id });
  }
  onSelectRims(id) {
    var productOptionIds = Object.assign([], this.state.productOptionIds);
    productOptionIds.push(id);
    this.setState({ rims: id, productOptionIds });
  }

  /**
   * Render Functions
   */
  renderGrade(grades) {
    let renderGrade = [];
    for (let i = 0; i < grades.length; i++) {
      renderGrade.push(<ListSubheader key={i}>{grades[i].name}</ListSubheader>);
      if (grades[i].product) {
        var product = grades[i].product;
        for (let a = 0; a < product.length; a++) {
          renderGrade.push(
            <MenuItem dense key={`${i}${a}`} value={product[a].id}>
              {product[a].name}
            </MenuItem>
          );
        }
      }
    }
    return renderGrade;
  }

  renderOptions(options) {
    let opt = [];
    Object.keys(options).forEach(key => {
      opt.push(<ListSubheader key={key}>{key}</ListSubheader>);
      let productOption = options[key];
      for (let i = 0; i < productOption.length; i++) {
        opt.push(
          <MenuItem
            dense
            key={`${key}${i}`}
            value={productOption[i].productOptionId}
          >
            {productOption[i].productOption.name}
          </MenuItem>
        );
      }
    });
    return opt;
  }

  handleSubmit() {
    const {
      productOptionIds,
      productVariantValueIds,
      price,
      tax,
      paid,
      productId
    } = this.state;
    var optionIds = productOptionIds.filter(opt => typeof opt == "string");
    this.props.action(
      {
        productId,
        productOptionIds: optionIds,
        productVariantValueIds,
        price,
        tax,
        paid,
        dealId: this.props.dealId
      },
      this.props.dealId
    );
    this.props.handleHide();
  }

  render() {
    const {
      show,
      handleHide,
      grades,
      exterior,
      interior,
      accessories,
      rims
    } = this.props;

    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        title="Deal Products"
        dialogAction={this.handleSubmit}
        dialogActionLabel="Save"
        size="md"
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <FormControl>
              {grades.loading && <RctSectionLoader />}
              <InputLabel shrink id="grade-label">
                1. Select Grade
              </InputLabel>
              <Select
                labelId="grade-label"
                id="grade-select"
                value={this.state.productId}
                onChange={e => this.onSelectGrade(e.target.value)}
                displayEmpty
              >
                <MenuItem dense value="">
                  <em>Select an option</em>
                </MenuItem>
                {this.renderGrade(grades.data)}
              </Select>
            </FormControl>
            {exterior.data.length > 0 && (
              <React.Fragment>
                <hr className="w-100" />
                <FormControl>
                  {exterior.loading && <RctSectionLoader />}
                  <InputLabel shrink id="exterior-label">
                    2. Select Exterior
                  </InputLabel>
                  <Select
                    labelId="exterior-label"
                    id="exterior-select"
                    value={this.state.exterior}
                    onChange={e =>
                      this.onSelectVariants(e.target.value, "exterior")
                    }
                    displayEmpty
                  >
                    <MenuItem dense value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {exterior.data.map((ext, key) => (
                      <MenuItem dense key={key} value={ext.id}>
                        {ext.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </React.Fragment>
            )}
            {interior.data.length > 0 && (
              <React.Fragment>
                <hr className="w-100" />
                <FormControl>
                  {interior.loading && <RctSectionLoader />}
                  <InputLabel shrink id="interior-label">
                    3. Select Interior
                  </InputLabel>
                  <Select
                    labelId="interior-label"
                    id="interior-select"
                    value={this.state.interior}
                    onChange={e =>
                      this.onSelectVariants(e.target.value, "interior")
                    }
                    displayEmpty
                  >
                    <MenuItem dense value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {interior.data.map((ext, key) => (
                      <MenuItem dense key={key} value={ext.id}>
                        {ext.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </React.Fragment>
            )}
            {rims.data.length > 0 && (
              <React.Fragment>
                <hr className="w-100" />
                <FormControl>
                  {rims.loading && <RctSectionLoader />}
                  <InputLabel shrink id="rims-label">
                    4. Select Rims
                  </InputLabel>
                  <Select
                    labelId="rims-label"
                    id="rims-select"
                    value={this.state.rims}
                    onChange={e => this.onSelectRims(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem dense value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {rims.data.map((ext, key) => (
                      <MenuItem dense key={key} value={ext.id}>
                        {ext.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </React.Fragment>
            )}

            {accessories.data != null && (
              <React.Fragment>
                <hr className="w-100" />
                <FormControl>
                  {accessories.loading && <RctSectionLoader />}
                  <InputLabel shrink id="accessories-label">
                    5. Select Accessories
                  </InputLabel>
                  <Select
                    labelId="accessories-label"
                    id="accessories-select"
                    multiple
                    value={this.state.productOptionIds}
                    onChange={e => this.onSelectOptions(e.target.value)}
                    displayEmpty
                  >
                    {this.renderOptions(accessories.data)}
                  </Select>
                </FormControl>
              </React.Fragment>
            )}
          </div>
        </div>
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ configuratorState }) => {
  // const { grades, exterior, interior, accessories, rims } = configuratorState;
  return { ...configuratorState };
};

export default connect(mapStateToProps, {
  getGrades,
  getExterior,
  getInterior,
  getAccessories
})(connectModal({ name: "deal_product" })(DealProductForm));
