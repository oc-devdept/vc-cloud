// import React from "react";
// import { show } from "redux-modal";
// import { Button, Radio } from "@material-ui/core";
// import { connect } from "react-redux";
// import SystemAlert from "Components/Alert/SystemAlert";

// import { updateTemplate } from "Ducks/marketing/template";

// function TemplateSelector(props) {
//   const { templateList, onSelectTemplate, selectedTemplate } = props;

//   const showEditTemplate = template => {
//     props.show("template_form", {
//       onSave: props.updateTemplate,
//       toEdit: template
//     });
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-3">
//         None
//         <div className="text-center">
//           <Radio
//             checked={selectedTemplate == ""}
//             onClick={() => onSelectTemplate("templateId", "")}
//             value={""}
//             color="default"
//             inputProps={{ "aria-label": "E" }}
//             size="small"
//           />
//         </div>
//       </div>
//       {templateList.length > 0 ? (
//         templateList.map((template, key) => (
//           <div key={key} className="col-3">
//             <iframe
//               scrolling="yes"
//               frameBorder={0}
//               style={{
//                 transform: "scale(0.5, 1) translateX(-55%)",
//                 width: "auto"
//               }}
//               src={
//                 "data:text/html;charset=utf-8," +
//                 encodeURIComponent(template.html)
//               }
//             ></iframe>
//             <Button
//               onClick={() => showEditTemplate(template)}
//               size="small"
//               color="primary"
//             >
//               Edit
//             </Button>
//             <div className="text-center">
//               <Radio
//                 checked={selectedTemplate == template.id}
//                 onClick={() => onSelectTemplate("templateId", template.id)}
//                 value={template.id}
//                 color="default"
//                 inputProps={{ "aria-label": "E" }}
//                 size="small"
//               />
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="col-12">
//           <SystemAlert
//             title="No Template Created!"
//             message="Create a new template from the Add New button above to get started."
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default connect(null, { show, updateTemplate })(TemplateSelector);
// import React from "react";
// import { show } from "redux-modal";
// import { Button, Radio } from "@material-ui/core";
// import { connect } from "react-redux";
// import SystemAlert from "Components/Alert/SystemAlert";

// import { updateTemplate } from "Ducks/marketing/template";

// function TemplateSelector(props) {
//   const { templateList, onSelectTemplate, selectedTemplate } = props;

//   const showEditTemplate = template => {
//     props.show("template_form", {
//       onSave: props.updateTemplate,
//       toEdit: template
//     });
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-3">
//         None
//         <div className="text-center">
//           <Radio
//             checked={selectedTemplate == ""}
//             onClick={() => onSelectTemplate("templateId", "")}
//             value={""}
//             color="default"
//             inputProps={{ "aria-label": "E" }}
//             size="small"
//           />
//         </div>
//       </div>
//       {templateList.length > 0 ? (
//         templateList.map((template, key) => (
//           <div key={key} className="col-3">
//             <iframe
//               scrolling="yes"
//               frameBorder={0}
//               style={{
//                 transform: "scale(0.5, 1) translateX(-55%)",
//                 width: "auto"
//               }}
//               src={
//                 "data:text/html;charset=utf-8," +
//                 encodeURIComponent(template.html)
//               }
//             ></iframe>
//             <Button
//               onClick={() => showEditTemplate(template)}
//               size="small"
//               color="primary"
//             >
//               Edit
//             </Button>
//             <div className="text-center">
//               <Radio
//                 checked={selectedTemplate == template.id}
//                 onClick={() => onSelectTemplate("templateId", template.id)}
//                 value={template.id}
//                 color="default"
//                 inputProps={{ "aria-label": "E" }}
//                 size="small"
//               />
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="col-12">
//           <SystemAlert
//             title="No Template Created!"
//             message="Create a new template from the Add New button above to get started."
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default connect(null, { show, updateTemplate })(TemplateSelector);
import React, { Component } from "react";
import { show } from "redux-modal";
import { Button, Radio, Card, Switch, FormControlLabel, Typography, CardActionArea, CardActions, CardMedia, CardContent } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { connect } from "react-redux";
import SystemAlert from "Components/Alert/SystemAlert";

import { updateTemplate, addContent, deleteTemplate, addTemplate, updateEmailContent, updateTemplateTitle } from "Ducks/marketing/template";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import Template from "..";

class TemplateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      open: false,
    };
    this.editTemplateTitle = this.editTemplateTitle.bind(this);
  }

  //const { templateList, adminTemplateList, contentData, selectedTemplate } = props;
  //const [Selected, SetSelected] = useState('');
  //const [ShareState, SetShareState] = useState([]);
  //const [setOpen] = React.useState(false);

  showSelected = (key, template) => {
    this.setState({
      selected: key,
    });
    this.props.onChange(template);
  };

  showEditTemplate = (template, title, key) => {
    this.props.show("template_new_form", {
      onSave: (data) => {
        this.props.updateTemplate(data);
        this.props.onChange(data);
      },
      toEdit: { ...template, ...{ title: "Template" } },
    });
  };

  showEditContent = (template, onSave, key) => {
    this.props.show("template_form", {
      onSave: (data) => {
        this.props.updateEmailContent(data.id, data.html, data.design);
        this.props.onChange(data);
      },
      toEdit: { ...template, ...{ title: "Content" } },
    });
  };

  // handleShareChange = (template, key, checked) => {
  //   this.props.updateTemplate({ id: template.id, isAdmin: checked });
  // };

  handleDelete = (tid) => {
    this.props.deleteTemplate(tid);
  };

  deleteTemplate = (template) => {
    this.props.show("alert_delete", {
      name: template.title,
      action: () => this.handleDelete(template.id),
    });
  };

  copyTemplate = (template, key) => {
    this.props.addTemplate({ design: template.design, html: template.html });
  };

  editTemplateTitle(template) {
    // console.log("IN EDIT TEMPLATE")
    this.props.show("template_details_form", {
      // onSave: this.props.addTemplate,
      onSub: this.props.updateTemplateTitle,
      toEdit: { title: template.title },
      title: template.title,
      description: template.description,
      id: template.id,
    });
  }

  render() {
    const { templateList, adminTemplateList, onChange, selectedTemplate } = this.props;
    return (
      <React.Fragment>
        <div className="row justify-content-center mb-30">
          {/* {adminTemplateList.map((template, key) => (
            <div key={"shared" + key} className="col-4 mb-15">
              <Card
                onClick={() => {
                  this.showSelected("shared" + key, template);
                }}
              >
                <CardActionArea
                  style={{
                    backgroundColor:
                      this.state.selected === "shared" + key
                        ? "#0c2041"
                        : "white",
                  }}
                >
                  <div className="d-flex justify-content-end mt-30"></div>
                  <CardMedia>
                    <iframe
                      scrolling="no"
                      frameBorder={0}
                      style={{
                        // transform: "scale(0.5, 1) translateX(-55%)",
                        width: "100%",
                      }}
                      src={
                        "data:text/html;charset=utf-8," +
                        encodeURIComponent(template.html)
                      }
                    ></iframe>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                      }}
                      onClick={() => {
                        this.showSelected("shared" + key, template);
                      }}
                    ></div>
                  </CardMedia>

                  <CardActions>
                    <div className="row-md-12 ">
                      <CardContent>
                        <div>
                          <span class="d-inline-block">
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {template.title}
                            </Typography>
                          </span>
                          <span class="d-inline-block btn float-right mb-30">
                            <IconButton
                              size="small"
                              variant="outlined"
                              className="text-info border-info   pb-20"
                              // style={{ color:"#D35C6A"}}
                              onClick={() => {
                                this.copyTemplate(template, "shared" + key);
                              }}
                            >
                              <FileCopyIcon />
                            </IconButton>
                          </span>
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {template.description}
                        </Typography>
                      </CardContent>
                    </div>

                    <Button
                        onClick={() => this.showEditContent(template, onChange, "shared" + key)}
                        size="small"
                        color="primary"
                      >
                        Content
                  </Button>
                  </CardActions>
                </CardActionArea>
                <div className="col-md-4 ">
                  <Button
                    style={{ background: "#125B96" }}
                    onClick={() =>
                      this.showEditContent(template, onChange, "shared" + key)
                    }
                    className="ml-20 mt-15  btn-success text-white"
                    variant="contained"
                    color="primary"
                  >
                    Content
                  </Button>
                </div>
              </Card>
            </div>
          ))} */}

          {templateList.map((template, key) => (
            <div key={"own" + key} className="col-6 mb-15">
              <Card
                onClick={() => {
                  this.showSelected("own" + key, template);
                }}
              >
                <CardActionArea
                  style={{
                    backgroundColor: this.state.selected === "own" + key ? "#0c2041" : "white",
                  }}
                >
                  <div className="d-flex justify-content-end mt-30">
                    {/* <IconButton
                    size="small"
                    variant="outlined"
                    className="text-info border-info ml-10"
                    // style={{ color:"#D35C6A"}}
                    onClick={() => {

                      this.copyTemplate(template, "shared" + key)
                    }}
                  >
                    <FileCopyIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    variant="outlined"
                    className="text-danger border-danger ml-10"
                    // style={{ color:"#D35C6A"}}
                    onClick={() => {

                      this.deleteTemplate(template, "own" + key)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                  </div>
                  <CardMedia>
                    <iframe
                      scrolling="no"
                      frameBorder={0}
                      style={{
                        // transform: "scale(0.5, 1) translateX(-55%)",
                        width: "100%",
                      }}
                      src={"data:text/html;charset=utf-8," + encodeURIComponent(template.html)}
                    ></iframe>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "90%",
                        top: "30px",
                      }}
                      onClick={() => {
                        this.showSelected("own" + key, template);
                      }}
                    ></div>
                  </CardMedia>
                  <CardContent>
                    <div>
                      <span class="d-inline-block">
                        <Typography gutterBottom variant="h5" component="h2">
                          {template.title}
                        </Typography>
                      </span>
                      <span class="d-inline-block btn float-right mb-30">
                        <IconButton
                          size="small"
                          variant="outlined"
                          className="text-info border-info ml-10"
                          // style={{ color:"#D35C6A"}}
                          onClick={() => {
                            this.editTemplateTitle(template);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          variant="outlined"
                          className="text-info border-info ml-10"
                          // style={{ color:"#D35C6A"}}
                          onClick={() => {
                            this.copyTemplate(template, "shared" + key);
                          }}
                        >
                          <FileCopyIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          variant="outlined"
                          className="text-danger border-danger ml-10"
                          // style={{ color:"#D35C6A"}}
                          onClick={() => {
                            this.deleteTemplate(template, "own" + key);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {template.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="d-flex justify-content-around col-md-12">
                      {/* <Button
                      onClick={() => this.showEditTemplate(template, { title: 'Template' }, "own" + key)}
                      size="small"
                      color="primary"
                    >
                      Template
                  </Button> */}
                      <div className="mb-30">
                        <Button
                          style={{ background: "#ff952e" }}
                          onClick={() => this.showEditTemplate(template, { title: "Template" }, "own" + key)}
                          // onClick={() => this.showEditContent(template, onChange, "shared" + key)}
                          className="ml-20 mt-30   btn-success text-white"
                          variant="contained"
                          color="primary"
                        >
                          Template
                        </Button>
                      </div>
                      {/* <Button
                      onClick={() => this.showEditContent(template, onChange, "own" + key)}
                      size="small"
                      color="primary"
                    >
                      Content
                    </Button> */}
                      <div>
                        <Button
                          style={{ background: "#125B96" }}
                          onClick={() => this.showEditContent(template, onChange, "own" + key)}
                          // onClick={() => this.editTemplateTitle(template)}
                          className="ml-20 mt-30   btn-success text-white"
                          variant="contained"
                          color="primary"
                        >
                          Content
                        </Button>
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
                              name="checkedB"
                              size="large"
                              checked={template.isAdmin}
                              color="primary"
                              onChange={(event) => this.handleShareChange(template, parseInt(key), event.target.checked)}
                            />
                          }
                          style={{
                            paddingTop: "6px",
                            marginLeft: "2px",
                            marginTop: "15px",
                          }}
                          label={
                            <Typography
                              style={{
                                fontSize: "0.8125rem",
                                color: "#595959",
                              }}
                            >
                              Share
                            </Typography>
                          }
                          labelPlacement="top"
                        />
                      </div>
                    </div>
                  </CardActions>
                </CardActionArea>
              </Card>
            </div>
          ))}
          {console.log("IN TEMPLATE SELECTOR ===========================")}
          {console.log(this.props)}
          {/* {templateList.length == 0 && adminTemplateList.length == 0 ? (
            <div className="col-12">
              <SystemAlert title="No Template Created!" message="Create a new template from the Add New button above to get started." />
            </div>
          ) : (
            ""
          )} */}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  show,
  updateTemplate,
  addContent,
  deleteTemplate,
  addTemplate,
  updateEmailContent,
  updateTemplateTitle,
})(TemplateSelector);
