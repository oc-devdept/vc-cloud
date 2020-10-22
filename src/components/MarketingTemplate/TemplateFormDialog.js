import React, { Component } from "react";
import { connectModal } from "redux-modal";

import FullScreenDialog from "Components/Dialog/FullScreenDialog";
import EmailEditor from "react-email-editor";

class TemplateFormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: this.props.design,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad = () => {
    if (this.props.toEdit) {
      if (this.editor !== undefined) {
        this.editor.loadDesign(this.props.toEdit.design);
      } else {
        setTimeout(() => this.editor.loadDesign(this.props.toEdit.design), 2000);
      }
    }
  };

  onSubmit = () => {
    this.editor.exportHtml((data) => {
      const { design, html } = data;
      this.props.toEdit ? this.props.onSave({ ...this.props.toEdit, design, html }) : this.props.onSave({ design, html });
      this.props.handleHide();
    });
  };

  render() {
    const { show, handleHide } = this.props;
    return (
      <FullScreenDialog title="Template Editor" show={show} handleHide={handleHide} dialogActionLabel={"Save"} dialogAction={this.onSubmit}>
        <EmailEditor
          minHeight="700px"
          appearance={{
            customCSS: [
              `body {
                background-color: yellow;
              }`,
            ],
          }}
          ref={(editor) => (this.editor = editor)}
          onLoad={this.onLoad}
        />
      </FullScreenDialog>
    );
  }
}
export default connectModal({ name: "template_form" })(TemplateFormDialog);
