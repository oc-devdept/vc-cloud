// import React, { Component } from "react";

// class marketing_template extends Component {
//   state = {};
//   render() {
//     return (
//       <div>
//         <p>template management</p>
//       </div>
//     );
//   }
// }

// export default marketing_template;
import React, { Component } from "react";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { show } from "redux-modal";
import { Icon } from "@iconify/react";
import { IconButton } from "@material-ui/core";
import TemplateDetailsForm from "Components/MarketingTemplate/Templateform";
// import TemplateDetailsForm from "./components/Templateform"
import TemplateSelector from "./components/TemplateSelector";
import TemplateFormDialog from "Components/MarketingTemplate/TemplateFormDialog";
// import TemplateNewFormDialog from "Components/MarketingTemplate/TemplateNewFormDialog";
import TemplateNewFormDialog from "Components/MarketingTemplate/TemplateNewFormDialog";
import addFilled from "@iconify/icons-carbon/add-filled";

//SEARCH BAR
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FormInput from "Components/Form/FormInput";
//react-redux Action
import {
  addTemplate,
  getAllTemplate,
  // getFilterTemplate,
} from "Ducks/marketing/template";
import { ArrowBack } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
class marketing_template extends Component {
  constructor(props) {
    super(props);
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
    this.handleChange = this.handleChange.bind(this);
    this.openNewTemplate = this.openNewTemplate.bind(this);
    this.templateDetailsForm = this.templateDetailsForm.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.printState = this.printState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onBackward = this.onBackward.bind(this);
  }

  componentDidMount() {
    this.props.getAllTemplate();
    // this.props.getFilterTemplate(
    //   this.state.limit,
    //   this.state.skip,
    //   this.state.filter,
    //   this.state.searchText,
    //   this.state.orderBy
    // );
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.totalCount !== prevProps.totalCount) {
  //     this.setState({ totalCount: this.props.totalCount });
  //   }
  // }

  onTemplateChange(template, design, html) {
    console.log("ON TEMPLATE CHANGE");
    console.log(template);
    console.log(design);
    console.log(html);
    this.setState({
      ...this.state,
      htmlContent: template.html,
      templateId: template.id,
    });
  }
  onForward() {
    // console.log("INFOWARD");
    var amount = this.state.skip + this.state.limit;
    if (amount >= this.props.totalCount) {
      this.setState({ skip: this.state.skip });
    } else {
      this.setState({ skip: amount });
    }
    // console.log(this.state.skip);
    // this.props.getFilterTemplate(
    //   this.state.limit,
    //   this.state.skip,
    //   this.state.filter,
    //   this.state.searchText,
    //   this.state.orderBy
    // );
  }
  onBackward() {
    // console.log("INBACKWARD");
    var amount = this.state.skip - this.state.limit;
    if (amount <= 0) {
      this.setState({ skip: 0 });
    } else {
      this.setState({ skip: amount });
    }
    // console.log(this.state.skip);
    // this.props.getFilterTemplate(
    //   this.state.limit,
    //   this.state.skip,
    //   this.state.filter,
    //   this.state.searchText,
    //   this.state.orderBy
    // );
  }
  openNewTemplate() {
    this.props.show("template_new_form", {
      onSave: this.props.addTemplate,
      toEdit: { title: "New Template" },
      title: this.state.title,
      description: this.state.description,
    });
  }
  templateDetailsForm = () =>
    this.props.show("template_details_form", {
      openNewTemplate: this.openNewTemplate,
    });

  handleChange(field, value) {
    // console.log("HANDLE CHANGE");
    // console.log(field);
    // console.log(value);
    this.setState({ [field]: value });
  }
  onSubmit() {
    // console.log("ON SUBMIT");
    // this.props.getFilterTemplate(
    //   this.state.limit,
    //   this.state.skip,
    //   this.state.filter,
    //   this.state.searchText,
    //   this.state.orderBy
    // );
  }
  printState() {
    // console.log("STATE");
    // console.log(this.state);
  }
  render() {
    const {
      templateList,
      adminTemplateList,
      // data,
      // completedTemplate,
      // totalCount,
    } = this.props;
    const { templateId, htmlContent, skip, limit } = this.state;
    // const classes = useStyles();
    // const totalPage = Math.ceil(totalCount / limit);
    return (
      <React.Fragment>
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
          onChange={this.onTemplateChange}
          // onChange={this.props.onChange}
          templateList={templateList}
          // adminTemplateList={adminTemplateList}
          selectedTemplate={templateId}
          // totalCount={totalCount}
        />
        <TemplateDetailsForm updateParent={this.handleChange} openTemplate={this.openNewTemplate} />
        <TemplateFormDialog />
        <TemplateNewFormDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ marketingState }) => {
  const { templateState } = marketingState;
  const { templateList } = templateState;
  return {
    templateList,
    // adminTemplateList,
    // completedTemplate,
    // totalCount,
    // totalPage,
  };
};

export default connect(mapStateToProps, {
  addTemplate,
  getAllTemplate,
  // getFilterTemplate,
  show,
})(marketing_template);
