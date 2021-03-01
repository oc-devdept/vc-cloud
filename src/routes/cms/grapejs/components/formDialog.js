import React, { Component } from "react";
import { connect } from "react-redux";

// Form Inputs
import FormInput from "Components/Form/FormInput";
import BaseInput from "Components/Form/BaseInput";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

class AddNewPageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            canSave: false,
            name: props.toEdit && props.toEdit.name,
            url: props.toEdit && props.toEdit.url,
            isActive: props.toEdit ? props.toEdit.isActive : true
        }
        console.log(this.state.isActive);
    }

    handleChange = (target, val) => {
        this.setState({
            [target]: val
        })
        if(target == "name" && val != ""){
            this.setState({
                canSave: true
            })
        }
    }

    switchClick = (evt) => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    handleSubmitForm = () => {
        this.props.saveForm({
            name: this.state.name,
            url: this.state.url,
            isActive: this.state.isActive
        })
    }
   

    render(){
        return (
            <form>
                 <h3 style={{ marginLeft: 35 }}>New Page details</h3>
                <div className="row">
                <div className="col-5">
                    <FormInput
                    label="Page Title"
                    value={this.state.name}
                    target="name"
                    handleChange={this.handleChange}
                    />

                </div>
                <div className="col-5 offset-md-1">
                    <FormInput
                    value={this.state.url}
                    label="URL (do not use http. leave blank to auto generate)"            
                    target="url"
                    handleChange={this.handleChange}
                    />


                </div>
                </div>
                <div className="row">
                <div className="col-5">
                <p className="text-muted">
                        Is Active
                        <Switch
                          target="isActive"
                          checked={this.state.isActive}
                          onChange={(e) => this.switchClick(e)}
                          color="primary"
                          name="isActive"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </p>
                </div>

                </div>
                <div className="d-flex mt-40 justify-content-end">
          <Button
            variant="contained"
            className="btn-success text-white"
            onClick={this.handleSubmitForm}
            disabled={!this.state.canSave}
          >
            {this.props.toEdit ? "Save" : "Create"}
          </Button>
        </div>
            </form>
        )
    }
}

export default AddNewPageForm;