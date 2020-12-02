import React, { Component } from 'react'
//Page req
import RecordsList from "Components/RecordsList";
import Image from "Components/Image";
import { show } from "redux-modal";

import { Edit, Delete } from "@material-ui/icons";
import { TableRow, TableCell, Button, IconButton, Switch } from "@material-ui/core";
import { Icon } from "@iconify/react";
import addFilled from "@iconify/icons-carbon/add-filled";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

import { getAllFooter, deleteFooterSection } from "Ducks/cms/footer";
import { connect } from 'react-redux';

// For testing
import { NotificationManager } from "react-notifications";
import DialogRoot from "Components/Dialog/DialogRoot";

// Popover Imports
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const PurpleSwitch = withStyles({
  switchBase: {
    color: orange[300],
    "&$checked": {
      color: orange[500],
    },
    "&$checked + $track": {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

// Popover Code
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      Products: [],
      loading: true,
      toggle: false,
      element: null,
      groupName: null,
      data: null,
      openpopover: false
    };

  }

  componentDidMount() {
    this.props.getAllFooter();
    this.props.cmsState;
  }

  // Delete Function
  delete(custID, custname) {
    this.props.show("alert_delete", {
      name: custname,
      action: () => this.handleSingleDelete(custID)
    });
  }

  handleSingleDelete(custId) {
    this.props.deleteFooterSection(custId);
  }

  // Edit Function

  handleOpenPopOver = () => {
    this.setState({ openpopover: true });
  };
  handleClosePopOver = () => {
    this.setState({ openpopover: false });
  };

  _RenderDialog = () => {
    console.log("RenderDialog works here")
    if (this.state.toggle) {
      switch (this.state.element) {
        case "Add_Grade":
          const MakeId = this.state.data.MakeId;
          const ModelId = this.state.data.ModelId;

          return (
            <DialogRoot
              // title={title}
              show={this.state.toggle}
              handleHide={this._RestartToggle}
              size={"md"}
            >

            </DialogRoot>
          );

        case "Selected_Footer":
          return (
            <React.Fragment>
              <Dialog onClose={this.handleClosePopOver} aria-labelledby="customized-dialog-title" open={openpopover} maxWidth={'md'} fullWidth={'md'}>
                <DialogTitle id="customized-dialog-title" onClose={this.handleClosePopOver}>
                  Preowned Car Enquiry Form
                      </DialogTitle>
                <DialogContent dividers>
                  <h6>PERSONAL DETAILS</h6>
                  <Typography gutterBottom>
                    <div class="form-row">
                      <div class="form-group col-md-2">
                        <label for="inputTitle">Title</label>
                        <select id="inputTitle" class="form-control">
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                        </select>
                      </div>
                      <div class="form-group col-md-5">
                        <label for="inputFirstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          required={true}
                          value={firstName}
                          onChange={(e) => onChangeForm('firstName', e.target.value)}
                          placeholder="Enter your first name" />
                      </div>
                      <div class="form-group col-md-5">
                        <label for="inputLastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          required={true}
                          value={lastName}
                          onChange={(e) => onChangeForm('lastName', e.target.value)}
                          placeholder="Enter your last name" />
                      </div>
                    </div>
                  </Typography>
                  <Typography gutterBottom>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputPhoneNumber">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          required={true}
                          value={phone}
                          onChange={(e) => onChangeForm('phone', e.target.value)}
                          placeholder="Enter your phone number" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmailAddess">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="emailAddress"
                          required={true}
                          value={email}
                          onChange={(e) => onChangeForm('email', e.target.value)}
                          placeholder="Enter your email address" />
                      </div>
                    </div>
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={this.handleClosePopOver} color="primary">
                    Book Appointment
                        </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          );
        default:
          return null;
      }
    }
  };

  ToggleDialog = (element, groupName, data, makes) => {
    console.log("ToggleDialog works here")
    this.setState({
      element: element,
      toggle: !this.state.toggle,
      groupName: groupName,
      data: data,
      makes: makes,
    });
  };

  render() {
    const { addGrade, modelName, title, tableData, makes } = this.props.cmsState.footerState.sectionList;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        label: "HEADER",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "DETAILS",
        name: "details",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "POSITION",
        name: "position",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        name: "ACTION", //EDIT
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <React.Fragment>
                <IconButton onClick={() => { this.ToggleDialog("Selected_Footer", tableMeta.rowData[0]) }} size="small">
                  {/* {this.props.ToggleDialog("Selected_Grade", tableMeta.rowData[0])} */}
                  {this._RenderDialog()}
                  <Edit style={{ fontSize: 14 }} />
                </IconButton>

                <IconButton size="small" onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}>
                  <Delete style={{ fontSize: 14 }} />
                </IconButton>
              </React.Fragment>
            );
          },
        },
      },
    ];

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      pagination: false,
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      setTableProps: () => ({ size: "small" }),
      customToolbar: (rowData, rowMeta) => {
        return (
          <IconButton onClick={() => this.props.ToggleDialog("Add_Grade", "", "", makes)} size="small">
            <Icon className="addIcon" icon={addFilled} width="2.5rem" height="2.5rem" color="#FF8B19" />
          </IconButton>
        );
      },
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} className="px-20">
              <Stock ProductID={rowData[0]} />
            </TableCell>
          </TableRow>
        );
      },
    };
    return <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={listOptions}
      borderRadius={"0px"}
      boxShadow={"none"} />;
  }
}

const mapStateToProps = ({ cmsState }) => {
  const { productList } = cmsState;
  return { productList, cmsState };
}

export default connect(mapStateToProps, { show, getAllFooter, deleteFooterSection })(Footer);
// export default connect(mapStateToProps, { show, getAllFeatured, deleteFeaturedSection} )(FeaturedList)