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

import {NotificationManager} from "react-notifications";

class FooterEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategory();
    }

    handleChange = (field, value) => {
        this.setState({ ...this.state, [field]: value });
    };

    handleUpload = file => {
        this.setState({
            coverPhoto: file
        });
    };

    _RestartToggle = () => {
      this.setState({toggle: !this.state.toggle});
    };

    render() {
        const { category, products } = this.props.carState;
        return (
            <React.Fragment>
                <Helmet title="New Car" />
                <PageTitleBar
                    title="Car New Page"
                />

                <h1>testing edit car page</h1>

            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { carState } = cmsState;
    return { carState };
};

export default connect(mapStateToProps, {
    getCategory,
    getProducts
})(FooterEditPage);
