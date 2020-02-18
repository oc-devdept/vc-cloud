import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { show } from "redux-modal";

// wysiwyg editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import TemplateSelector from "./components/TemplateSelector";
import TemplateFormDialog from "Components/MarketingTemplate/TemplateFormDialog";

//react-redux Action
import { addTemplate, getAllTemplate } from "Ducks/marketing/template";

class TemplateForm extends Component {
  constructor(props) {
    super(props);
    // this.rteChange = this.rteChange.bind(this);
    this.openNewTemplate = this.openNewTemplate.bind(this);
    this.modules = {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image"]
        ]
      },
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
      "image"
    ];
  }

  componentDidMount() {
    this.props.getAllTemplate();
  }

  openNewTemplate() {
    this.props.show("template_form", {
      onSave: this.props.addTemplate
    });
  }

  render() {
    const { templateList, data } = this.props;
    const { templateId, htmlContent } = data;

    return (
      <React.Fragment>
        <div className="row mb-30">
          <div className="col-md-4 offset-md-4 text-center">
            <h3>Template List</h3>
          </div>
          <div className="col-md-4">
            <div className="text-right">
              <Button
                variant="outlined"
                onClick={this.openNewTemplate}
                size="small"
              >
                Add New
              </Button>
            </div>
          </div>
        </div>

        <TemplateSelector
          onSelectTemplate={this.props.onChange}
          templateList={templateList}
          selectedTemplate={templateId}
        />

        <h3 className="text-center mt-30">Content</h3>

        <ReactQuill
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          onChange={html => this.props.onChange("htmlContent", html)}
          value={htmlContent}
        />
        <TemplateFormDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ marketingState }) => {
  const { templateState } = marketingState;
  const { templateList } = templateState;
  return { templateList };
};

export default connect(mapStateToProps, {
  addTemplate,
  getAllTemplate,
  show
})(TemplateForm);
