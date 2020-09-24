import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
import { NotificationManager } from "react-notifications";

import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";
import Dropzone from "Components/Dropzone";

// Input Components
import FormInput from "Components/Form/FormInput";

const initialState = {
    id: 0,
    name: "",
    position: 0,
    captionPosition: "",
    caption1: "",
    caption2: "",
    linkURL: "",
    files: []
}

class BannerForm extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
        this.handleDetail = this.handleDetail.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.edit) {
            const { id, name, position, captionPosition, caption1, caption2, linkURL} = this.props.edit;
            this.setState({
                id,
                name,
                position,
                captionPosition,
                caption1,
                caption2,
                linkURL
            });
        }
    }

    handleDetail(field, value){
        this.setState({
            [field]: value
        });
    }

    removeFile = (file) => {
        this.setState(state => {
          const index = state.files.indexOf(file);
          const files = state.files.slice(0);
          files.splice(index, 1);
          return { files };
        });
    }

    handleUpload = file => {
        this.setState({
            files: file
        });
    };

    dataForSave(){
      var data = new FormData();
      if(this.state.files.length > 0){
        data.append("upload", this.state.files[0]);
      }
      if(this.props.edit){
        data.append("id", this.state.id);
      }
      data.append("name", this.state.name);
      data.append("position", this.state.position);
      data.append("captionPosition", this.state.captionPosition);
      data.append("caption1", this.state.caption1);
      data.append("caption2", this.state.caption2);
      data.append("linkURL", this.state.linkURL);
      return data;
    }

    onSubmit() {
        var data = this.dataForSave();
        this.props.handleSubmit(data, true, this.props.history);
    }
    
    onSaveNew() {
        var data = this.dataForSave();
        this.props.handleSubmit(data, false);
        this.setState(initialState);
    }

    checkDisabled() {
        const disabled =
          this.state.name != "" && this.state.files;
        return disabled;
      }

    render(){
        const { edit, title } = this.props;
        const { loading } = this.props.bannerForm;
        const bannername = (<FormInput
            label="Banner name"
            value={this.state.name}
            target="name"
            handleChange={this.handleDetail}
          />)
        const position = (<FormInput
            label="Position"
            value={this.state.position}
            target="position"
            handleChange={this.handleDetail}
          />)
          const caption1 = (<FormInput
            label="Caption 1"
            value={this.state.caption1}
            target="caption1"
            handleChange={this.handleDetail}
          />)
          const captionPosition = (<FormInput
            label="Caption position"
            value={this.state.captionPosition}
            target="captionPosition"
            selectValues={[
                { name: "Top left", value: "top-left" },
                { name: "Center left", value: "center-left" },
                { name: "Bottom left", value: "bottom-left" },
                { name: "Top center", value: "top-center" },
                { name: "Center center", value: "center-center" },
                { name: "Bottom center", value: "bottom-center" },
                { name: "Top right", value: "top-right" },
                { name: "Center right", value: "center-right" },
                { name: "Bottom right", value: "bottom-right" }
              ]}
            handleChange={this.handleDetail}
          />)
          const linkURL = (<FormInput
            label="Link URL"
            value={this.state.linkURL}
            target="linkURL"
            handleChange={this.handleDetail}
          />)
          const caption2 = (<FormInput
            label="Caption 2"
            value={this.state.caption2}
            target="caption2"
            handleChange={this.handleDetail}
          />)
          const imageBox = (<Dropzone
            onDrop={this.handleUpload}
            onRemove={this.removeFile}
            uploadedFiles={this.state.files}
            additionalText="Files can't be edited once uploaded."
          />);
        const layout = [
            {
                title: "Key information",
                desc: "Input these fields to create a new Banner",
                leftCol: [bannername, position, caption1],
                rightCol: [captionPosition, linkURL, caption2]
            },
            {
                title: "Upload Picture",
                desc: "Upload the banner picture",
                fullRow: [imageBox]
            }
        ]
        const form = layout.map((field, key) => (
            <React.Fragment key={key}>
              <FormInputLayout {...field} />
              <hr />
            </React.Fragment>
          ));
        
        return (<FormWrapper
                onSave={this.onSubmit}
                onSaveNew={this.onSaveNew}
                disabled={this.checkDisabled()}
                edit={edit}
                title={title}
            >
             {loading && <RctSectionLoader />}
                <hr />
                <form autoComplete="off">
                { form }
                </form>
            </FormWrapper>
        )
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { bannerState } = cmsState;
    const { bannerForm } = bannerState;
    return { bannerForm };
  };
  
  export default withRouter(
    connect(mapStateToProps, {
      
    })(BannerForm)
  );