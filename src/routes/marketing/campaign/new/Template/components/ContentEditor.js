import React, { Component } from "react";

import EmailEditor from "react-email-editor";

const restoreDesign = design => {
  window.unlayer.loadDesign(design);
};

export default class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: this.props.design,
      id: this.props.id
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
        onLoad={this.restore}
        id={this.state.id}
      />
    );
  }
}
