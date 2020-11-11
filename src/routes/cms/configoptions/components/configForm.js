import React, { Component } from "react";
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

const initialState = {
    name: "",
    position: 0,
    price: 0
}

class configForm extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
        
        this.onSave = this.onSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        if(this.props.edit != null){
            this.state= this.props.edit;
        }
        this.checkDisabled = this.checkDisabled.bind(this);
    }

    handleChange(field, value){
        this.setState({
            [field]: value
        })
    }

    onSave(){
        this.props.saveConfig(this.state);
        this.props.closeForm();
    }

    checkDisabled(){
        if(this.state.position >= 0 && this.state.name != "" && !isNaN(this.state.price) ){
            return true;
        }
        return false;
    }

    render(){
        const configName = (<FormInput
            label="Name"
            value={this.state.name}
            required={this.state.name == ""}
            target="name"
            handleChange={this.handleChange}
          />);
        const position = (<FormInput
            label="Position"
            value={this.state.position}
            required={this.state.position == ""}
            target="position"
            handleChange={this.handleChange}
          />);
        const price = (<FormInput
            label="Price"
            value={this.state.price}
            required={this.state.price == ""}
            target="price"
            handleChange={this.handleChange}
          />);
        const description = (<FormInput
            label="Description"
            value={this.state.description}
            target="description"
            handleChange={this.handleChange}
          />);
        const layout = {
            title: this.props.formSectionTitle,
            desc: this.props.formDesc,
            leftCol: [configName, price],
            rightCol: [position, description]               
        };
        return (
            <FormWrapper
                onSave={this.onSave}                    
                title={this.props.formTitle}
                disabled={this.checkDisabled()}
            >                
                <hr />
                <form autoComplete="off">
            <FormInputLayout { ...layout } />            
                </form>
        </FormWrapper>
        )
    }
}
export default configForm;