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
import Footerform from './components/Footerform';
import FooterCreateForm from './components/FooterCreateForm';

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

    this.state = {
      Products: [],
      loading: true,
      toggle: false,
      element: null,
      groupName: null,
      data: null,
      openpopover: false,
      lastName: ''
    };
  }

  componentDidMount() {
    this.props.getAllFooter();
    this.props.cmsState;
  }

  // Delete Function
  delete(custID, custname, custdetails) {
    console.log(custID)
    console.log(custname)
    console.log(custdetails)
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
    console.log("handle pop over")
    this.setState({ openpopover: true });
  };
  handleClosePopOver = () => {
    console.log("handle close over")
    this.setState({ openpopover: false });
  };

  // For edit footer form
  changeEmailSettings = (id, header, details, position) => {
    this.props.show("footer_form", {
      itemList: [id, header, details, position],
    })
  };

  // For creating new footer form
  createFooterForm = (id, header, details, position) => {
    this.props.show("footer__create_form", {
      itemList: [id, header, details, position],
    })
  };

  render() {
    const { title, tableData, makes } = this.props.cmsState.footerState.sectionList;
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
                <IconButton onClick={() => { this.changeEmailSettings(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[2], tableMeta.rowData[3]) }} size="small">
                  <Footerform changeEmailSettings={this.changeEmailSettings} />
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
          <IconButton onClick={() => {this.createFooterForm()} } size="small">
            <FooterCreateForm createFooterForm={this.createFooterForm} />
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
    return (
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
        borderRadius={"0px"}
        boxShadow={"none"} />);
  }
}

const mapStateToProps = ({ cmsState }) => {
  const { productList } = cmsState;
  return { productList, cmsState };
}

export default connect(mapStateToProps, { show, getAllFooter, deleteFooterSection })(Footer);