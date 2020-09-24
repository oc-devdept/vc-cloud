import React, { Component } from "react";
import { connect } from "react-redux";

import RctSectionLoader from "Components/RctSectionLoader";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";
import FormInput from "Components/Form/FormInput";


import { newFeaturedSection, editFeaturedSection } from "Ducks/cms/featured";

const initialState = {
    name: "",
    position: 0
}

class FeaturedSectionForm extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
        this.onSave = this.onSave.bind(this);
        this.onSaveNew = this.onSaveNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkDisabled = this.checkDisabled.bind(this);                
    }
    componentDidMount(){
        if(this.props.edit){
            this.setState({
                id: this.props.edit.id,
                name: this.props.edit.name,
                position: this.props.edit.position
            })
        }
    }

    handleChange(field, value){
        this.setState({
            [field]: value
        })
    }

    onSave(){
        this.props.newFeaturedSection(this.state, false);
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


    render() {
        const { edit, title } = this.props;
        const { loading } = this.props.sectionForm;
        const sectionName = (<FormInput
            label="Category Name"
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
        const layout = {
                title: "Featured Section",
                desc: "A section contains featured cars",
                leftCol: [sectionName],
                rightCol: [position]
            };
        
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
                </form>
        </FormWrapper>
        )
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { featuredState } = cmsState;
    const { sectionForm } = featuredState;
    return { sectionForm };
  };
export default connect(mapStateToProps, { newFeaturedSection, editFeaturedSection})(FeaturedSectionForm);