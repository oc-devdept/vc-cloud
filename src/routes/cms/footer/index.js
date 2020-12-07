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

import { getAllFooter, deleteFooterSection, newFooterSection, editFooterSection } from "Ducks/cms/footer";
import { connect } from 'react-redux';

// For testing
import { NotificationManager } from "react-notifications";
import DialogRoot from "Components/Dialog/DialogRoot";

// Rich text editor
import Editor from "Components/Wysiwyg";

// Popover Imports
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Footerform from './components/Footerform';
import FooterCreateForm from './components/FooterCreateForm';
import EditFooterForm from './components/EditFooterForm';
import FormInput from "Components/Form/FormInput";
import { positions } from '@material-ui/system';

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
    this.changeEmailSettings = this.changeEmailSettings.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);



    this.handleChange = this.handleChange.bind(this);

    this.state = {
      Products: [],
      loading: true,
      toggle: false,
      element: null,
      groupName: null,
      data: null,
      openpopover: false,
      openedit: false,
      id: '',
      headerEdit: '',
      detailsEdit: '',
      positionEdit: '',
      header: '',
      details: '',
      position: '',
    };
  }

  componentDidMount() {
    this.props.getAllFooter();
    this.props.cmsState;
  }

  // Delete Function
  delete(custID, custname, custdetails) {
    this.props.show("alert_delete", {
      name: custname,
      action: () => this.handleSingleDelete(custID)
    });
  }

  handleSingleDelete(custId) {
    this.props.deleteFooterSection(custId);
  }

  // For open and closing of new form
  handleOpenPopOver = () => {
    this.setState({ openpopover: true });
  };
  handleClosePopOver = () => {
    this.setState({ openpopover: false });
  };

  // For open and closing of edit form
  handleOpenEdit = () => {
    this.setState({ openedit: true });
  };
  handleCloseEdit = () => {
    this.setState({ openedit: false });
  };

  // For setting the state of state variables
  onChangeForm = (element, value) => {
    this.setState({ [element]: value });
  }

  // For setting the state of the edit state variables
  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  // Submit new footer content
  submitForm = () => {
    const form = {
      header: this.state.header,
      details: this.state.details,
      position: this.state.position
    }
    this.props.newFooterSection(form);
    this.handleClosePopOver();
  }

  // Edit current footer content
  editForm = () => {
    const form = {
      id: this.state.id,
      header: this.state.headerEdit,
      details: this.state.detailsEdit,
      position: this.state.positionEdit,
    }

    this.props.editFooterSection(form);
    this.handleCloseEdit();
  }

  // For edit footer form
  changeEmailSettings = (id, header, details, position) => {
    // this.handleOpenPopOver();
    this.props.show("footer_form", {
      itemList: [id, header, details, position],
    })
  };

  onClick = (id, header, details, position) => {
    this.handleOpenEdit();
    // Set state for state variables to preload data
    this.setState({ id: id });
    this.setState({ headerEdit: header });
    this.setState({ detailsEdit: details });
    this.setState({ positionEdit: position });

  }

  // For creating new footer form
  createFooterForm = (id, header, details, position) => {
    this.props.show("footer__create_form", {
      itemList: [id, header, details, position],
    })
  };

  render() {
    const { title, tableData, makes } = this.props.cmsState.footerState.sectionList;
    const { id, header, details, position, headerEdit, detailsEdit, positionEdit } = this.state
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
                <IconButton onClick={() => this.onClick(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[2], tableMeta.rowData[3])} size="small">
                  <Edit style={{ fontSize: 14 }} />
                </IconButton>

                <IconButton size="small" onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[2]) }}>
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
      // Add new footer content
      customToolbar: (rowData, rowMeta) => {
        return (
          <React.Fragment>
            <IconButton onClick={this.handleOpenPopOver} size="small">
              <Icon className="addIcon" icon={addFilled} width="2.5rem" height="2.5rem" color="#FF8B19" />
            </IconButton>

          </React.Fragment>
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
    return (
      <React.Fragment>
        <RecordsList
          title={title}
          columns={columns}
          data={tableData}
          options={listOptions}
          borderRadius={"0px"}
          boxShadow={"none"} />
        <Dialog onClose={this.handleCloseEdit} aria-labelledby="customized-dialog-title" open={this.state.openedit} maxWidth={'md'} fullWidth={'md'}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseEdit}>Edit Footer Content</DialogTitle>
          <DialogContent dividers>
            <div class="form-row">
              <label for="inputFirstName">Header</label>
              <input
                type="text"
                className="form-control"
                id="headerEdit"
                required={true}
                value={headerEdit}
                onChange={(e) => this.onChangeForm('headerEdit', e.target.value)}
                placeholder="Enter your header" />
              <label for="inputFirstName">Details</label>
              <Editor changeData={(value) => this.setState({ detailsEdit: value })} data={detailsEdit} target="detailsEdit" handleChange={this.onChangeForm} />
              <label for="inputFirstName">Position</label>
              <input
                type="text"
                className="form-control"
                id="positionEdit"
                required={true}
                value={positionEdit}
                onChange={(e) => this.onChangeForm('positionEdit', e.target.value)}
                placeholder="Enter your position" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.editForm} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog onClose={this.handleClosePopOver} aria-labelledby="customized-dialog-title" open={this.state.openpopover} maxWidth={'md'} fullWidth={'md'}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClosePopOver}>Create New Footer Content</DialogTitle>
          <DialogContent dividers>
            <div class="form-row">
              <label for="inputFirstName">Header</label>
              <input
                type="text"
                className="form-control"
                id="header"
                required={true}
                value={header}
                onChange={(e) => this.onChangeForm('header', e.target.value)}
                placeholder="Enter your header" />
              <label for="inputFirstName">Details</label>
              <Editor changeData={(value) => this.setState({ details: value })} data={details} target="details" handleChange={this.onChangeForm} />
              <label for="inputFirstName">Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                required={true}
                value={position}
                onChange={(e) => this.onChangeForm('position', e.target.value)}
                placeholder="Enter your position" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.submitForm} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ cmsState }) => {
  const { productList } = cmsState;
  return { productList, cmsState };
}

export default connect(mapStateToProps, { show, getAllFooter, deleteFooterSection, newFooterSection, editFooterSection })(Footer);