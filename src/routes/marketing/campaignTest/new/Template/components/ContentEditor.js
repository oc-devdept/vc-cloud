import React, { Component } from "react";

import EmailEditor from "react-email-editor";

const restoreDesign = design => {
  window.unlayer.loadDesign(design);
};

export default class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: '',
      html: ''
    };
  }

  exportHtml = callback => {
    this.emailEditor.exportHtml(callback);
  };

  restore = () => {
    restoreDesign(this.state.json);
  };

  render() {
    return (
      <EmailEditor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="customEditorClass"
        ref={emailEditor => (this.emailEditor = emailEditor)}
        // id={this.state.id}
      />
    );
  }
}
