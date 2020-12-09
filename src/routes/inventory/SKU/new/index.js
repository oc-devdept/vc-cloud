import React, { Component } from "react";
import api from "Api";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";
// import SKU_customer_list from "SKU";

class SKU_new_customer extends Component {
    constructor(props){
        super(props); 
        this.state = {
            toggle: false,
            element: null
        }
        this.onSubmit = this.onSubmit.bind(this);               
    }
    onSubmit() {

    }

    onSaveNew() {

    }

    checkDisabled() {
        return true
    }

    buttonClick = (target) => {
        this.setState({
            toggle:true,
            element: target
        })
    }

    restartToggle = () => {
        this.setState({
            toggle: false
        })
    }


    render() {
        return (

            <FormWrapper
                onSave={this.onSubmit}
                onSaveNew={this.onSaveNew}
                disabled={this.checkDisabled()}
                title="Test"
                edit="test"
            >

                <form autoComplete="off">
                    <div class="row">
                        <div class="col-sm-4 unvisibleBtn"> <FormInput
                            label="P/N"
                            value=""
                            target="partno"
                            hasButton={true}
                        /></div>
                        <div class="col-sm-8">
                            <FormInput
                                label="Description"
                                value=""
                                target="Description"
                                hasButton={true}
                                buttonClick={this.buttonClick}
                            />
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm"><FormInput
                            label="GRP1"
                            value=""
                            target="GRP1"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="GRP2"
                            value=""
                            target="GRP2"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Size"
                            value=""
                            target="Size"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                    </div>
                    <div class="row">
                        <div class="col-sm"><FormInput
                            label="SEL1"
                            value=""
                            target="SEL1"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="SEL2"
                            value=""
                            target="SEL2"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Material"
                            value=""
                            target="Material"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Brand"
                            value=""
                            target="Brand"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                    </div>
                    <div class="row">
                        <div class="col-sm"><FormInput
                            label="Supp1"
                            value=""
                            target="Supp1"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Supp2"
                            value=""
                            target="Supp2"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Supp3"
                            value=""
                            target="Supp3"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Supp4"
                            value=""
                            target="Supp4"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Supp5"
                            value=""
                            target="Supp5"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                    </div>
                    <div class="row">
                        <div class="col-sm"><FormInput
                            label="UOM"
                            value=""
                            target="UOM"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm"><FormInput
                            label="Currency"
                            value=""
                            target="Currency"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div class="col-sm unvisibleBtn"><FormInput
                            label="Unit Cost"
                            value=""
                            target="Unit Cost"
                            hasButton={true}
                        /></div>
                        <div class="col-sm unvisibleBtn"><FormInput
                            label="List Price(SGD)"
                            value=""
                            target="List Price(SGD)"
                            hasButton={true}
                        /></div>
                    </div>
                    <div class="col-3 justify-content-md-left" style={{marginLeft:"-10px" }}>
                        <FormInput
                            label="Location"
                            value=""
                            target="Location"
                            hasButton={true}
                            buttonClick={this.buttonClick}
                        /></div>
                        <div className="unvisibleBtn">
                             <FormInput
                            label="Remarks"
                            value=""
                            target="Remarks"
                            multiline
                            rows={4}
                            hasButton={true}
                        />
                        </div>
                        
                  
                </form>
                <DialogRoot show={this.state.toggle}
                        handleHide={ this.restartToggle}
                        size={"md"}>
                            <div>{ this.state.element }</div>
                        </DialogRoot>
                    
            </FormWrapper>
        )
    }
}

export default SKU_new_customer;