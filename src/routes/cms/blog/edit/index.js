import React, {Component} from "react";
import { connect } from "react-redux";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//sub components
import Dropzone from "Components/Dropzone";
import FormInput from "Components/Form/FormInput";
import Button from "Components/Inventory/Button";
import StaticName from "Components/Inventory/StaticName";
import BlobImage from "Components/Inventory/BlobImage";
import Editor from "Components/Wysiwyg";
import DatePickerInput from "Components/Form/Pickers/DatePicker";
import DialogRoot from "Components/Dialog/DialogRoot";

import PublishModal from "../components/PublishModal";
import api from "Api";
import * as url from "Helpers/cmsURL";
import {NotificationManager} from "react-notifications";

class BlogEditPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            intro: '',
            content: '',
            publishDate: '',
            keywords: '',
            tags: '',
            status: '',
            id: '',
            blogPhoto: [],
            blogPhotoString: [],
            currentPhoto: [],
            toggle: false
        };
    }

    componentDidMount = async () => {
        const result = await api.get(`/carblogs/getSingleBlog/?id=${this.props.match.params.id}`);
        let singleData = result.data.data;
        this.setState({
            title: singleData.title,
            intro: singleData.intro,
            content: singleData.content,
            publishDate: singleData.publishDate,
            keywords: singleData.keywords,
            tags: singleData.tags,
            status: singleData.status,
            id: singleData.id,
            blogPhoto: [],
            blogPhotoString: [],
            currentPhoto: singleData.file
        })
    };

    saveblog = () => {
        this.setState({ toggle: true })
    };

    handleChange = (field, value) => {
        this.setState({ ...this.state, [field]: value });
    };

    handleUpload = file => {
        const item = URL.createObjectURL(file[0]);
        let CloneEditedImages = file;
        let CloneEditedImagesStrings = [item];

        this.setState(state => ({
            ...state,
            blogPhoto: CloneEditedImages,
            blogPhotoString: CloneEditedImagesStrings
        }));
    };

    removeFile = async (index) => {
        const actualGallery = this.state.currentPhoto.slice(0);
        const image = actualGallery[index];

        await api.delete(`carblogs/deleteImages/${image.id}`);
        const result = await api.get(`/carblogs/getSingleBlog/?id=${this.props.match.params.id}`);
        let singleData = result.data.data;

        this.setState({ ...this.state, currentPhoto: singleData.file });
    };

    publishArticle = async (pn) => {
        let keys = this.state.keywords.split(',');
        let tags = this.state.tags.split(',');

        if (this.state.blogPhoto.length > 0 && this.state.currentPhoto.length > 0) {
            const actualGallery = this.state.currentPhoto.slice(0);
            const image = actualGallery[0];

            await api.delete(`carblogs/deleteImages/${image.id}`);
        }

        let formData = new FormData();
        formData.append('id', this.props.match.params.id);
        formData.append('title', this.state.title);
        formData.append('intro', this.state.intro);
        formData.append('publishDate', this.state.publishDate);
        formData.append('content', this.state.content);
        formData.append('keywords', keys);
        formData.append('tags', tags);
        formData.append('status', pn);
        formData.append('articleImage', this.state.blogPhoto[0]);

        await api.post(`/carblogs/editBlog`, formData);
        this.props.history.push(`${url.blogPage}`);
        NotificationManager.success('Updated successfully!');
        this.setState({toggle: false})
    };

    render() {
        return (
            <React.Fragment>
                <Helmet title="Edit Blog" />
                <PageTitleBar
                    title="Edit Blog"
                />

                <div className="ml-50 mr-50 bg-white shadow shadow-lg border-rad-md border-dark"
                     style={{
                         boxShadow: `0px 0px 5px grey`,
                         padding: 80
                     }}
                >
                    <h3 className="text-muted text-center text-gray">Input your Blog Title</h3>
                    <FormInput
                        label="Title"
                        value={this.state.title}
                        required={!this.state.title}
                        target="title"                                                                               //input car name
                        handleChange={this.handleChange}
                    />

                    <h3 className="text-muted text-center text-gray">Blog Introduction</h3>
                    <FormInput
                        multiline
                        rows={4}
                        label="Introduction"
                        target="intro"
                        value={this.state.intro}
                        handleChange={this.handleChange}
                    />

                    <div className="text-center mt-30">
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
                                <StaticName title="UPLOAD BLOG IMAGE" />
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    uploadedFiles={[]}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>

                            <div className="d-flex flex-column" style={{ flex: 0.25 }}>
                                <StaticName title="CURRENT BLOG IMAGE" />
                                {this.state.currentPhoto.length > 0 && (
                                    <div className="d-flex flex justify-content-center">
                                        <BlobImage
                                            imageSource={this.state.currentPhoto}
                                            url={true}
                                            remove={true}
                                            removeNewImages={this.removeFile}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex flex-column" style={{ flex: 0.25 }}>
                                <StaticName title="PREVIEW BLOG IMAGE" />
                                {this.state.blogPhotoString.length > 0 && (
                                    <div className="d-flex flex justify-content-center">
                                        <BlobImage
                                            imageSource={this.state.blogPhotoString}
                                            url={false}
                                            remove={false}
                                            // removeNewImages={this.removeFile}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Publish Date</h3>
                    <div className="w-100">
                        <DatePickerInput
                            label="Publish Date"
                            value={
                                this.state.publishDate ? this.state.publishDate : null
                            }
                            target="publishDate"
                            handleChange={this.handleChange}
                        />
                    </div>

                    <h3 className="text-muted text-center text-gray mb-10 mt-50">Article Content</h3>
                    <div className="w-100">
                        <Editor changeData={(value) => this.setState({content: value})} data={this.state.content} />
                    </div>

                    <h3 className="text-muted text-center text-gray mt-30">Input your SEO Keywords</h3>
                    <FormInput
                        label="SEO Keywords"
                        value={this.state.keywords}
                        target="keywords"                                                                               //input car name
                        handleChange={this.handleChange}
                    />

                    <h3 className="text-muted text-center text-gray mt-30">Input your SEO Meta Tags</h3>
                    <FormInput
                        label="SEO Meta Tags"
                        value={this.state.tags}
                        target="tags"                                                                               //input car name
                        handleChange={this.handleChange}
                    />

                    <Button
                        divStyle={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        _Function={this.saveblog}
                        title="Save"
                    />
                </div>

                <DialogRoot
                    size="md"
                    show={this.state.toggle}
                    handleHide={() => this.setState({toggle: false})}
                >
                    <PublishModal
                        publishArticle={this.publishArticle}
                    />
                </DialogRoot>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ cmsState }) => {
    const { blogState } = cmsState;
    return { blogState };
};

export default connect(mapStateToProps, {

})(BlogEditPage)
