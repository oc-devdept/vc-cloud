import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import Dropzone from "Components/Dropzone";
import FormInput from "Components/Form/FormInput";
import StaticName from "Components/Inventory/StaticName";
import BlobImage from "Components/Inventory/BlobImage";
import Button from "Components/Inventory/Button";
import DialogRoot from "Components/Dialog/DialogRoot";
import Editor from "Components/Wysiwyg";

import api from "Api";
import * as url from "Helpers/cmsURL";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Actions
import { getCategory, getProducts } from "Ducks/cms/car";

import { NotificationManager } from "react-notifications";

// Redux Imports
import { editFooterSection } from "Ducks/cms/footer";

import { footerPage } from "Helpers/cmsURL";

class FooterEditPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeForm = this.onChangeForm.bind(this);

        this.state = {
            toggle: false,
            id: '',
            header: '',
            details: '',
            position: '',
        };
    }

    componentDidMount() {
        let carId  = this.props.match.params.id;
        
        for(let i=0; i < this.props.footerState.sectionList.tableData.length; i++){
            if(this.props.footerState.sectionList.tableData[i].id == carId){
                console.log(this.props.footerState.sectionList.tableData[i].details);
                this.setState({
                    id: this.props.footerState.sectionList.tableData[i].id,
                    header: this.props.footerState.sectionList.tableData[i].name,
                    details: this.props.footerState.sectionList.tableData[i].details,
                    position: this.props.footerState.sectionList.tableData[i].position,
                });
            }
        }

    }

    // For setting the state of state variables
    onChangeForm = (element, value) => {
        this.setState({ [element]: value });
    }

    handleChange = (field, value) => {
        this.setState({ ...this.state, [field]: value });
    };

    // Submit new footer content
    submitForm = () => {
        const form = {
            id: this.state.id,
            header: this.state.header,
            details: this.state.details,
            position: this.state.position
        }
        console.log("form here")
        console.log(form)
        this.props.editFooterSection(form);
        NotificationManager.success("FOOTER car edited");
        this.props.history.push(footerPage);
    }

    _RestartToggle = () => {
        this.setState({ toggle: !this.state.toggle });
    };

    render() {
        return (
            <React.Fragment>
                <Helmet title="New Car" />
                <PageTitleBar
                    title="Edit Footer Content"
                />

                <div className="ml-50 mr-50 bg-white shadow shadow-lg border-rad-md border-dark"
                    style={{
                        boxShadow: `0px 0px 5px grey`,
                        padding: 80
                    }}
                >


                    <h3 className="text-muted text-center text-gray">Header</h3>
                    <FormInput
                        label="Name"
                        value={this.state.header}
                        required={true}
                        target="header"
                        handleChange={this.handleChange} />


                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Details</h3>
                    <div className="w-100">
                        <Editor changeData={(value) => this.setState({ details: value })} data={this.state.details} target="details" />
                    </div>
                    {/* data={detailsEdit} target="detailsEdit" handleChange={this.onChangeForm} */}

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Position</h3>
                    <FormInput
                        label="Name"
                        value={this.state.position}
                        required={true}
                        target="position"
                        handleChange={this.handleChange} />


                    <Button
                        divStyle={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        _Function={this.submitForm}
                        title="Save Product"
                    />
                </div>

                <DialogRoot
                    size="md"
                    show={this.state.toggle}
                    handleHide={() => this.setState({ toggle: false })}>

                </DialogRoot>

            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { footerState } = cmsState;
    return { footerState };
};

export default connect(mapStateToProps, { getCategory, getProducts, editFooterSection })(FooterEditPage);

