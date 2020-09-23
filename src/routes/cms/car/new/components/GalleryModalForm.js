import React, { PureComponent } from "react";

import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";

import Input from "Components/Inventory/Input";
import StaticName from "Components/Inventory/StaticName";
import Button from "Components/Inventory/Button";

class GalleryModalForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            caption: ''
        };

        this._OnChange = this._OnChange.bind(this);
    }

    removeFile = file => {
        this.setState(state => {
            const index = state.files.indexOf(file);
            const files = state.files.slice(0);
            files.splice(index, 1);
            return { files };
        });
    };

    handleUpload = file => {
        this.setState({
            files: file
        });
    };

    _OnChange = (e, element) => {
        this.setState({ [element]: e });
    };

    addPhoto = () => {
        this.props.addGallery(this.state.files, this.state.caption);
        this.setState({files: [], caption: ''});
    };

    render() {
        return (
            <div className="d-flex" style={{ flexDirection: "column" }}>
                <div className="d-flex justify-content-center">
                    <div style={{ flex: 1 }} className="d-flex justify-content-center">
                        <span style={{ textAlign: "center" }}>Photo Gallery</span>
                    </div>
                    <Cancel fontSize="large" onClick={this.props._RestartToggle} />
                </div>

                <div className="d-flex" style={{ flexDirection: "row", flex: 1 }}>
                    <div
                        className="d-flex flex-column justify-content-between"
                        style={{ flex: 1, marginRight: 30 }}
                    >
                        <div className="d-flex flex-row">
                            <Input
                                divStyle={{ width: "100%", marginRight: 30 }}
                                title="Image Caption"
                                placeholder="e.g This is honda side"
                                value={this.state.caption}
                                element={"caption"}
                                _HandleProduct={this._OnChange}
                            />
                        </div>

                        <StaticName title={"IMAGE UPLOAD"} />
                        <Dropzone
                            onDrop={this.handleUpload}
                            onRemove={this.removeFile}
                            uploadedFiles={this.state.files}
                            additionalText="Files can't be edited once uploaded."
                        />
                    </div>
                </div>

                <Button
                    divStyle={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    _Function={this.addPhoto}
                    title="ADD"
                />
            </div>
        );
    }
}

export default GalleryModalForm;

const validateForm = (make, files) => {
    let Reject = true;
    Object.values(make).map(e => {
        if (e == "" || e == 0) {
            Reject = false;
        }
    });

    if (files.length == 0) {
        Reject = false;
    }

    return Reject;
};
