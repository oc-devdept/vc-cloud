// import React, { Component } from "react";
// import { Button } from "@material-ui/core";
// import { connect } from "react-redux";
// import { show } from "redux-modal";

// // wysiwyg editor
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

// import TemplateSelector from "./components/TemplateSelector";
// import TemplateFormDialog from "Components/MarketingTemplate/TemplateFormDialog";

// //react-redux Action
// import { addTemplate, getAllTemplate } from "Ducks/marketing/template";

// class TemplateForm extends Component {
//   constructor(props) {
//     super(props);
//     // this.rteChange = this.rteChange.bind(this);
//     this.openNewTemplate = this.openNewTemplate.bind(this);
//     this.modules = {
//       toolbar: {
//         container: [
//           [{ header: "1" }, { header: "2" }, { font: [] }],
//           [{ size: [] }],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [
//             { list: "ordered" },
//             { list: "bullet" },
//             { indent: "-1" },
//             { indent: "+1" }
//           ],
//           ["link", "image"]
//         ]
//       },
//       clipboard: {
//         // toggle to add extra line breaks when pasting HTML:
//         matchVisual: false
//       }
//     };

//     this.formats = [
//       "header",
//       "font",
//       "size",
//       "bold",
//       "italic",
//       "underline",
//       "strike",
//       "blockquote",
//       "list",
//       "bullet",
//       "indent",
//       "link",
//       "image"
//     ];
//   }

//   componentDidMount() {
//     this.props.getAllTemplate();
//   }

//   openNewTemplate() {
//     this.props.show("template_form", {
//       onSave: this.props.addTemplate
//     });
//   }

//   render() {
//     const { templateList, data } = this.props;
//     const { templateId, htmlContent } = data;

//     return (
//       <React.Fragment>
//         <div className="row mb-30">
//           <div className="col-md-4 offset-md-4 text-center">
//             <h3>Template List</h3>
//           </div>
//           <div className="col-md-4">
//             <div className="text-right">
//               <Button
//                 variant="outlined"
//                 onClick={this.openNewTemplate}
//                 size="small"
//               >
//                 Add New
//               </Button>
//             </div>
//           </div>
//         </div>

//         <TemplateSelector
//           onSelectTemplate={this.props.onChange}
//           templateList={templateList}
//           selectedTemplate={templateId}
//         />

//         <h3 className="text-center mt-30">Content</h3>

//         <ReactQuill
//           theme="snow"
//           modules={this.modules}
//           formats={this.formats}
//           onChange={html => this.props.onChange("htmlContent", html)}
//           value={htmlContent}
//         />
//         <TemplateFormDialog />
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = ({ marketingState }) => {
//   const { templateState } = marketingState;
//   const { templateList } = templateState;
//   return { templateList };
// };

// export default connect(mapStateToProps, {
//   addTemplate,
//   getAllTemplate,
//   show
// })(TemplateForm);
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { show } from "redux-modal";

//ALL ICONS
import { Icon } from "@iconify/react";
import { IconButton } from "@material-ui/core";
import addFilled from "@iconify/icons-carbon/add-filled";
import FormInput from "Components/Form/FormInput";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// wysiwyg editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import TemplateDetailsForm from "Components/MarketingTemplate/Templateform";
import TemplateSelector from "./components/TemplateSelector";
import TemplateFormDialog from "Components/MarketingTemplate/TemplateFormDialog";
import TemplateNewFormDialog from "Components/MarketingTemplate/TemplateNewFormDialog";
//react-redux Action
import { addTemplate, getAllTemplate } from "Ducks/marketing/template";

class TemplateForm extends Component {
  constructor(props) {
    super(props);
    // this.rteChange = this.rteChange.bind(this);
    this.state = {
      templateId: "",
      htmlContent: "",
      title: "No Title Added",
      description: "No Description Added",
      limit: 12,
      skip: 0,
      filters: [],
      searchText: "",
      orderBy: [],
      totalCount: this.props.totalCount,
    };
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
      onSave: this.props.addTemplate,
      toEdit: { title: "New Template" },
      title: this.state.title,
      description: this.state.description,
    });
  }

  render() {
    const { templateList, data } = this.props;
    const { templateId, htmlContent } = data;

    return (
      <React.Fragment>
        {/* <div className="row mb-30">
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
        </div> */}
          <div className="row mb-30">
          <div className="col-md-4 offset-md-4 text-center">
            <h3>Template List</h3>
          </div>
          <div className="col-md-4">
            <div className="text-right">
              <IconButton onClick={() => editFollowup()} size="small">
                <Icon className="addIcon" icon={addFilled} width="2.5rem" height="2.5rem" color="#FF8B19" onClick={this.openNewTemplate} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row mt-10 mb-30">
          <div className="d-flex w-25"></div>
          <div className="d-flex flex-row w-50 ">
            <FormInput className="" placeholder="Search Template" type="text" value={this.state.searchText} target="searchText" handleChange={this.handleChange}></FormInput>
            <IconButton>
              <SearchIcon onClick={this.onSubmit} />
            </IconButton>
          </div>
          <div className="d-flex flex-row justify-content-end w-25">
            <IconButton size="small">
              <ArrowBackIcon onClick={this.onBackward} />
            </IconButton>
            <h3 className="mt-15"> {/* {skip + 1} &nbsp; of &nbsp; {totalPage} */}</h3>
            <IconButton size="small">
              <ArrowForwardIcon onClick={this.onForward} />
            </IconButton>
          </div>
          {/* <IconButton size="small">
            <ArrowForwardIcon onClick={this.printState} />
          </IconButton> */}
        </div>

        <TemplateSelector
             onChange={this.props.onChange}
          // onSelectTemplate={this.props.onChange}
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
        <TemplateDetailsForm />
        <TemplateNewFormDialog />
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
