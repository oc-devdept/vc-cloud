import React, { Component } from "react";
import { connect } from "react-redux";
import { show, hide } from "redux-modal";
import RctSectionLoader from "Components/RctSectionLoader";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormInput from "Components/Form/FormInput";
import BaseInput from "Components/Form/BaseInput";
import {
  InputLabel,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import ProductPickerDialog  from "Routes/inventory/Cars/components/ProductPickerDialog";


import { newFeaturedCar, editFeaturedCar } from "Ducks/cms/featured";

const initialState = {
    name: "",
    grade: null,
    position: 0,
    featured: [],
    selectedFeatures: {}
}

class FeaturedCarForm extends Component {
    constructor(props){
        super(props);
        this.state = initialState;       
        this.onSave = this.onSave.bind(this);
        this.onSaveNew = this.onSaveNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.checkDisabled = this.checkDisabled.bind(this);                
    }
    componentDidMount(){
        if(this.props.edit){            
        }
        
    }

    handleChange(field, value){
      /*
        if(field == "grade"){
            let car = this.props.products.tableData.find(element => element.id == value);

            let featured = car.productDetailValue.map( item => {
              if(item.detailCategory){
                return {
                  name: item.detailCategory.name,
                  id: item.detailCategoryId
                }
              }
              else {
                return {};
              }
            });
            this.setState({
              featured: featured
            });
        }  
        */      
        this.setState({
            [field]: value
        })
    }

    handleChecked(evt){
      this.setState({
        selectedFeatures:{
          ...this.state.selectedFeatures,
          [evt.target.name]: evt.target.checked
        }
      })
    }

    onSave(){
        this.props.newFeaturedCar(this.state, false);
        this.props.closeForm();
    }

    onSaveNew(){
        //this.props.newFeaturedSection(id, this.state, false);
        this.props.closeForm();
    }

    checkDisabled(){
        if(this.state.position >= 0 && this.state.name != ""){
            return true;
        }
        return false;
    }

    renderName(value) {
        const selected = Object.assign([], this.props.products.tableData).find(
          (cust) => cust.id == value
        );
        if (selected) {
          return selected.name;
        } else {
          return "";
        }
      }


    render() {
        const { edit, title, products } = this.props;
        const { loading } = this.props.carForm;
        const sectionName = (<FormInput
            label="Name"
            value={this.state.name}
            required={this.state.name == ""}
            target="name"
            handleChange={this.handleChange}
          />);
        const position = (<FormInput
            label="Section Position"
            value={this.state.position}
            required={this.state.position == ""}
            target="position"
            handleChange={this.handleChange}
          />)
        const chooseCar = (<React.Fragment>
            <FormControl>
              <InputLabel className="fw-bold" shrink>
                Car
              </InputLabel>
              <BaseInput
                value={this.renderName(this.state.grade)}
                readOnly
                onFocus={() => this.props.show("product_picker")}
                onClick={() => this.props.show("product_picker")}
                required
              />
              <FormHelperText error>* Required Field</FormHelperText>
            </FormControl>            
            <ProductPickerDialog
              onSelect={this.handleChange}
              selected={this.state.grade}
              handleHide={this.props.closeForm}
              target="grade"
              loading={products.loading}
              tableData={products.tableData}                       
            />            
          </React.Fragment>)
        const chooseFeatures = (
          <FormGroup row>
            {
              this.state.featured.map(item => (<FormControlLabel
                control={
                  <Checkbox
                                      
                    name={item.id}
                    color="primary"
                    onChange={this.handleChecked}
                  />
                }
                label={item.name}
              />))
            }            
          </FormGroup>
        )

        const layout = {
                title: "Featured Car",
                desc: "Featured Cars in a section",
                leftCol: [sectionName, chooseCar],
                rightCol: [position]               
            };
        const featureLayout = {
              title: "Choose features",
              desc: "Select features that will be shown in Featured car section (max 4)",                
              fullRow: [chooseFeatures]
        }
        return (
            <FormWrapper
                onSave={this.onSave}
                onSaveNew={this.onSaveNew}                        
                title={title}
                disabled={this.checkDisabled()}
            >
                {loading && <RctSectionLoader />}
                <hr />
                <form autoComplete="off">
            <FormInputLayout { ...layout } />
            { /* <FormInputLayout { ...featureLayout } />  */ }
                </form>
        </FormWrapper>
        )
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { featuredState } = cmsState;
    const { carForm } = featuredState;
    return { carForm };
  };
export default connect(mapStateToProps, { show, newFeaturedCar, editFeaturedCar})(FeaturedCarForm);