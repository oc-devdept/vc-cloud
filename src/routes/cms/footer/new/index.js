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

import { footerPage } from "Helpers/cmsURL";

// Redux Imports
import { getAllFooter, deleteFooterSection, newFooterSection, editFooterSection } from "Ducks/cms/footer";

class FooterNewPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeForm = this.onChangeForm.bind(this);



        this.state = {
            toggle: false,
            header: '',
            details: '',
            position: '',
        };
    }

    componentDidMount() {
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
            header: this.state.header,
            details: this.state.details,
            position: this.state.position
        }
        console.log("form here")
        console.log(form)
        this.props.newFooterSection(form);

        // Reset all fields to empty after saving
        this.setState({
            header: '',
            details: '',
            position: ''
        })

        this.props.history.push(footerPage);
    }

    _RestartToggle = () => {
        this.setState({ toggle: !this.state.toggle });
    };

    render() {
        const { category, products } = this.props.carState;
        return (
            <React.Fragment>
                <Helmet title="New Car" />
                <PageTitleBar
                    title="Create New Footer Content"
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
                        <Editor changeData={(value) => this.setState({ details: value })} />
                    </div>

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
    const { carState } = cmsState;
    return { carState };
};

export default connect(mapStateToProps, { getCategory, getProducts, newFooterSection })(FooterNewPage);
