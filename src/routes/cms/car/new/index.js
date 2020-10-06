import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";

//sub components
import Dropzone from "Components/Dropzone";
import FormInput from "Components/Form/FormInput";
import StaticName from "Components/Inventory/StaticName";
import BlobImage from "Components/Inventory/BlobImage";
import Button from "Components/Inventory/Button";
import DialogRoot from "Components/Dialog/DialogRoot";

import api from "Api";
import * as url from "Helpers/cmsURL";

import ProductCheckBox from "../components/ProductCheckBox";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import GalleryModalForm from "./components/GalleryModalForm";

// Actions
import { getCategory, getProducts } from "Ducks/cms/car";

//css
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import {NotificationManager} from "react-notifications";

class CarNewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            categoryName: "",
            product: [],
            coverPhoto: [],
            Exterior: [],
            Interior: [],
            description: "",
            photo: {
                galleryString: [],
                gallery: [],
                captions: []
            },
            toggle: false,
        };
        this.modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false
            }
        };
        this.formats = [
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "background",
            "color",
            "script",
            "indent",
            "code-block",
            "align",
            "direction",
            "list",
            "formula"
        ];
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategory();
    }

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
        this.setState({
            coverPhoto: file
        });
    };

    removeFile = file => {
        this.setState(state => {
            const index = state.coverPhoto.indexOf(file);
            const files = state.coverPhoto.slice(0);
            files.splice(index, 1);
            return { files };
        });
    };

    handle360Exterior = file => {
        this.setState({Exterior: file})
    };

    remove360Exterior = file => {
        this.setState(state => {
            const index = state.Exterior.indexOf(file);
            const files = state.Exterior.slice(0);
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
            const files = state.Interior.slice(0);
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
          categoryName: "",
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

      await api.post(`/carpages/new`, formData);
        setTimeout(() => {
            this.props.history.push(`${url.carPage}`);
        }, 500);
      NotificationManager.success("Make saved successfully");
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
                        <h3 className="text-muted text-center text-gray">Add Cover Photo</h3>
                        <Dropzone
                            onDrop={this.handleUpload}
                            onRemove={this.removeFile}
                            uploadedFiles={this.state.coverPhoto}
                            additionalText="Files can't be edited once uploaded."                                   //upload cover image
                        />
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
                            />
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Description</h3>
                    <div className="w-100">
                        <ReactQuill
                            theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            onChange={html => this.setState({description: html})}
                            value={this.state.description}
                        />
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">360 Gallary</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <Dropzone
                                onDrop={this.handle360Exterior}
                                onRemove={this.remove360Exterior}
                                uploadedFiles={this.state.Exterior}
                                additionalText="Files can't be edited once uploaded."                                   //upload cover image
                            />
                            <div className="text-center">Exterior</div>
                        </div>
                        <div className="col-md-6">
                            <Dropzone
                                onDrop={this.handle360Interior}
                                onRemove={this.remove360Interior}
                                uploadedFiles={this.state.Interior}
                                additionalText="Files can't be edited once uploaded."                                   //upload cover image
                            />
                            <div className="text-center">Interior</div>
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Photo Gallary</h3>

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
})(CarNewPage);
