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

import ProductCheckBox from "../components/ProductCheckBox";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import * as url from "Helpers/cmsURL";
import GalleryModalForm from "../new/components/GalleryModalForm";

// Actions
import { getCategory, getProducts } from "Ducks/cms/car";
import {NotificationManager} from "react-notifications";

class CarEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            categoryName: "",
            product: [],
            coverPhoto: [],
            coverPhotoString: [],
            currentCoverPhoto: [],
            Exterior: [],
            existExterior: [],
            Interior: [],
            existInterior: [],
            description: "",
            photo: {
                galleryString: [],
                gallery: [],
                captions: []
            },
            existGallery: [],
            toggle: false,
        };
    }

    componentDidMount = async () => {
        this.props.getProducts();
        this.props.getCategory();

        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let coverPhoto = []; let exteriors=[]; let interiors = []; let galleries = [];
        for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].fileableType === "CarPage-Cover") { coverPhoto.push(data.file[i]) }
            else if (data.file[i].fileableType === "CarPage-Exterior") { exteriors.push(data.file[i]) }
            else if (data.file[i].fileableType === "CarPage-Interior") { interiors.push(data.file[i]) }
        }

        for (let j = 0; j < data.gallery.length; j++) {
            galleries.push(data.gallery[j].file)
        }

        this.setState({
            name: data.name,
            description: data.description,
            category: data.categoryId,
            categoryName: data.categoryName,
            product: data.products.split(','),
            currentCoverPhoto: coverPhoto,
            existExterior: exteriors,
            existInterior: interiors,
            existGallery: galleries
        })
    };

    handleChange = (field, value) => {
        this.setState({ ...this.state, [field]: value });
    };

    handleCategory = (field, value) => {
        const { category } = this.props.carState;

        let catName = '';
        category.forEach(cat => {
            if (cat.value === value) {
                catName = cat.name;
            }
        });
        this.setState({...this.state, [field]: value, categoryName: catName})
    };

    handleUpload = file => {
        const item = URL.createObjectURL(file[0]);                          //upload cover photo
        let CloneEditedImages = file;
        let CloneEditedImagesStrings = [item];

        this.setState({
            coverPhoto: CloneEditedImages,
            coverPhotoString: CloneEditedImagesStrings
        });
    };

    removeFile = file => {
        this.setState(state => {
            const index = state.coverPhoto.indexOf(file);                   //remove uploaded image
            const files = state.coverPhoto.slice(0);
            files.splice(index, 1);
            return { files };
        });
    };

    removeExistingCover = async (index) => {
        const actualGallery = this.state.currentCoverPhoto.slice(0);        //remove existing cover image in db
        const image = actualGallery[index];

        await api.delete(`carblogs/deleteImages/${image.id}`);

        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let coverPhoto = [];
        for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].fileableType === "CarPage-Cover") { coverPhoto.push(data.file[i]) }
        }

        this.setState({
            ...this.state,
            currentCoverPhoto: coverPhoto
        });
    };

    removeExistingExterior = async (index) => {                         //remove existing exterior image in db
        const actualGallery = this.state.existExterior.slice(0);
        const image = actualGallery[index];

        await api.delete(`carblogs/deleteImages/${image.id}`);

        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let exteriors=[];
        for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].fileableType === "CarPage-Exterior") { exteriors.push(data.file[i]) }
        }

        this.setState({
            ...this.state,
            existExterior: exteriors,
        });
    };

    removeExistingInterior = async (index) => {                         //remove existing exterior image in db
        const actualGallery = this.state.existInterior.slice(0);
        const image = actualGallery[index];

        await api.delete(`carblogs/deleteImages/${image.id}`);

        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let interiors=[];
        for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].fileableType === "CarPage-Interior") { interiors.push(data.file[i]) }
        }

        this.setState({
            ...this.state,
            existInterior: interiors,
        });
    };

    removeExistGallery = async (index) => {
        const gallery = this.state.existGallery.slice(0);
        const image = gallery[index];
        await api.delete(`carblogs/deleteGallery/${image.id}`);

        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let galleries = [];

        for (let j = 0; j < data.gallery.length; j++) {
            galleries.push(data.gallery[j].file)
        }
        this.setState({...this.state, existGallery: galleries});
    };

    handle360Exterior = file => {
        this.setState({Exterior: file})
    };

    remove360Exterior = file => {
        this.setState(state => {
            const index = state.Exterior.indexOf(file);
            const files = state.Exterior;
            files.splice(index, 1);
            return { files };
        });
    };

    handle360Interior = file => {
        this.setState({Interior: file})
    };

    remove360Interior = file => {
        this.setState(state => {
            const index = state.Interior.indexOf(file);
            const files = state.Interior;
            files.splice(index, 1);
            return { files };
        });
    };

    handleLimitProduct = data => {
        this.setState({product: data})
    };

    handleNewGalleryUpload = (file, caption) => {
        // Needs to add to both arrays
        const { gallery, galleryString, captions } = { ...this.state.photo };
        let CloneEditedImages = gallery.slice(0);
        let CloneEditedImagesStrings = galleryString.slice(0);
        let CloneEditedCaptions = captions.slice(0);

        const item = URL.createObjectURL(file[0]);
        CloneEditedImages = CloneEditedImages.concat(file);
        CloneEditedImagesStrings = CloneEditedImagesStrings.concat(item);
        CloneEditedCaptions = CloneEditedCaptions.concat(caption);

        this.setState(state => ({
            ...state,
            photo: {
                gallery: CloneEditedImages,
                galleryString: CloneEditedImagesStrings,
                captions: CloneEditedCaptions
            }
        }));
    };

    removeGalleryString = async index => {
        // Needs to add to both arrays
        const { gallery, galleryString, captions } = { ...this.state.photo };
        let CloneEditedImages = gallery.slice(0);
        let CloneEditedImagesStrings = galleryString.slice(0);
        let CloneEditedCaptions = captions.slice(0);

        CloneEditedImages = CloneEditedImages.filter(
            (e, indexes) => indexes != index
        );
        CloneEditedImagesStrings = CloneEditedImagesStrings.filter(
            (e, indexes) => indexes != index
        );
        CloneEditedCaptions = CloneEditedCaptions.filter(
            (e, indexes) => indexes != index
        );

        this.setState(state => ({
            ...state,
            photo: {
                gallery: CloneEditedImages,
                galleryString: CloneEditedImagesStrings,
                captions: CloneEditedCaptions
            }
        }));
    };

    saveProduct = async () => {
        let params = this.state;
        let galleryPhoto = [];
        for (let i=0; i<this.state.photo.gallery.length ; i++) {
            let tmp = {};
            tmp.photo = this.state.photo.gallery[i].name;
            tmp.caption = this.state.photo.captions[i];

            galleryPhoto.push(tmp);
        }
        params.galleryPhoto = galleryPhoto;

        let formData = new FormData();
        formData.append('editId', this.props.match.params.id);
        formData.append('name', params.name);
        formData.append('description', params.description);
        formData.append('category', params.category);
        formData.append('categoryName', params.categoryName);
        formData.append('product', params.product);
        formData.append('galleryPhoto', JSON.stringify(params.galleryPhoto));
        params.coverPhoto.map(file => formData.append('coverPhoto', file));
        params.photo.gallery.map(file => formData.append('gallery', file));
        params.Exterior.map(file => formData.append('exterior', file));
        params.Interior.map(file => formData.append('interior', file));

        this.setState({
            name: "",
            category: "",
            product: [],
            coverPhoto: [],
            Exterior: [],
            Interior: [],
            description: "",
            photo: {
                galleryString: [],
                gallery: [],
                captions: []
            }
        });

        await api.post(`/carpages/edit`, formData);
        this.props.history.push(`${url.carPage}`);
        NotificationManager.success("Updated successfully");
    };

    _RestartToggle = () => {
        this.setState({toggle: !this.state.toggle});
    };

    render() {
        const { category, products } = this.props.carState;
        return (
            <React.Fragment>
                <Helmet title="Edit Car" />
                <PageTitleBar
                    title="Car Edit Page"
                />

                <div className="ml-50 mr-50 bg-white shadow shadow-lg border-rad-md border-dark"
                     style={{
                         boxShadow: `0px 0px 5px grey`,
                         padding: 80
                     }}
                >
                    <h3 className="text-muted text-center text-gray">Input your Car Name</h3>
                    <FormInput
                        label="Name"
                        value={this.state.name}
                        required={!this.state.name}
                        target="name"                                                                               //input car name
                        handleChange={this.handleChange}
                    />

                    <div className="text-center mt-30">
                        <h3 className="text-muted text-center text-gray">Edit Cover Photo</h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flex: 1,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        >
                            <div
                                style={{ display: "flex", flexDirection: "column", flex: 0.5 }}
                            >
                                <StaticName title="UPLOAD COVER IMAGE" />
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    uploadedFiles={[]}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>

                            <div className="d-flex flex-column" style={{ flex: 0.25 }}>
                                <StaticName title="CURRENT COVER IMAGE" />
                                {this.state.currentCoverPhoto.length > 0 && (
                                    <div className="d-flex flex justify-content-center">
                                        <BlobImage
                                            imageSource={this.state.currentCoverPhoto}
                                            url={true}
                                            remove={true}
                                            removeNewImages={this.removeExistingCover}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex flex-column" style={{ flex: 0.25 }}>
                                <StaticName title="PREVIEW COVER IMAGE" />
                                {this.state.coverPhotoString.length > 0 && (
                                    <div className="d-flex flex justify-content-center">
                                        <BlobImage
                                            imageSource={this.state.coverPhotoString}
                                            url={false}
                                            remove={true}
                                            removeNewImages={this.removeFile}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Select Category and Grade</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput
                                label="Category"
                                value={this.state.category}
                                required={!this.state.category}
                                selectValues={category}
                                target="category"
                                handleChange={this.handleCategory}
                            />
                        </div>
                        <div className="col-md-6">
                            <ProductCheckBox
                                products={products}
                                handleLimitProduct={this.handleLimitProduct}
                                preSelected={this.state.product}
                            />
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Description</h3>
                    <div className="w-100">
                        <Editor changeData={(value) => this.setState({description: value})} data={this.state.description} />
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">360 Gallary</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <StaticName title="UPLOAD NEW EXTERIOR IMAGES" />
                            <Dropzone
                                onDrop={this.handle360Exterior}
                                onRemove={this.remove360Exterior}
                                uploadedFiles={this.state.Exterior}
                                additionalText="Files can't be edited once uploaded."                                   //upload exterior image
                            />
                        </div>
                        <div className="col-md-6">
                            <StaticName title="CURRENT EXTERIOR IMAGES" />
                            {this.state.existExterior.length > 0 && (
                                <div className="d-flex flex justify-content-center">
                                    <BlobImage
                                        imageSource={this.state.existExterior}
                                        url={true}
                                        remove={true}
                                        removeNewImages={this.removeExistingExterior}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row mt-30">
                        <div className="col-md-6">
                            <StaticName title="UPLOAD NEW INTERIOR IMAGES" />
                            <Dropzone
                                onDrop={this.handle360Interior}
                                onRemove={this.remove360Interior}
                                uploadedFiles={this.state.Interior}
                                additionalText="Files can't be edited once uploaded."                                   //upload interior image
                            />
                        </div>
                        <div className="col-md-6">
                            <StaticName title="CURRENT INTERIOR IMAGES" />
                            {this.state.existInterior.length > 0 && (
                                <div className="d-flex flex justify-content-center">
                                    <BlobImage
                                        imageSource={this.state.existInterior}
                                        url={true}
                                        remove={true}
                                        removeNewImages={this.removeExistingInterior}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Photo Gallery</h3>
                    <div className="d-flex flex-column justify-content-center" style={{ flex: 1 }}>
                        <Button
                            divStyle={{
                                display: "flex",
                                justifyContent: "flex-center",
                                marginTop: 10,
                                marginBottom: 10
                            }}
                            _Function={() => this.setState({toggle: true})}
                            title="Add Photo Gallery"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 1,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "column", flex: 0.5 }}
                        >
                            <StaticName title="CURRENT PHOTO GALLERY IMAGES" />
                            {this.state.existGallery.length > 0 ? (
                                <BlobImage
                                    imageSource={this.state.existGallery}
                                    url={true}
                                    remove={true}
                                    removeNewImages={this.removeExistGallery}
                                />
                            ) : (
                                <div className="text-left text-gray">There is no gallery</div>
                            )}
                        </div>

                        <div
                            style={{ display: "flex", flexDirection: "column", flex: 0.5 }}
                        >
                            <StaticName title="NEW PHOTO GALLARY IMAGES" />
                            {this.state.photo.galleryString.length > 0 ? (
                                <BlobImage
                                    imageSource={this.state.photo.galleryString}
                                    url={false}
                                    remove={true}
                                    removeNewImages={this.removeGalleryString}
                                />
                            ) : (
                                <div className="text-left text-gray">You didn't upload image yet</div>
                            )}
                        </div>
                    </div>

                    <Button
                        divStyle={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        _Function={this.saveProduct}
                        title="Save Product"
                    />
                </div>

                <DialogRoot
                    size="md"
                    show={this.state.toggle}
                    handleHide={() => this.setState({toggle: false})}
                >
                    <GalleryModalForm
                        _RestartToggle={this._RestartToggle}
                        addGallery={this.handleNewGalleryUpload}
                    />
                </DialogRoot>
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
})(CarEditPage);
