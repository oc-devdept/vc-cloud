import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";
import Image from "Components/Image";

//import CarList from "Components/CarList";

import { Edit, Delete } from "@material-ui/icons";
import { TableRow, TableCell, Button, IconButton, Switch } from "@material-ui/core";
import { Icon } from "@iconify/react";
import addFilled from "@iconify/icons-carbon/add-filled";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { show, connectModal } from "redux-modal";
import { connect } from "react-redux";

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

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);
  };

  state = {
    currentProduct: null,
    ProductDetailLoading: false,
  };

  delete(id) {
    this.props.show("alert_delete", {
      name: id,
      action: () => this.handleSingleDelete(id)
    })
  }

  handleSingleDelete(preownedId) {
    console.log(preownedId);
    this.props.DeleteCar(preownedId);
  }

  render() {
    const { addGrade, modelName, title, tableData, makes } = this.props;
    console.log(this.props)
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        label: "NAME",
        name: "model",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "GRADE",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "IMAGE",
        name: "image",
        options: {
          customBodyRender: (value, tableMeta) => {
            if (value.length > 0) {
              return <Image imageSource={value} single={true} thumbNail={true} />;
            } else {
              return "No image";
            }
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
        label: "COST PRICE",
        name: "cost_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        label: "SELLING PRICE",
        name: "selling_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          },
        },
      },
      {
        name: "ACTION", //EDIT
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            return (
              <React.Fragment>
                <IconButton onClick={() => this.props.ToggleDialog("Selected_Grade", rowState.rowData[0])} size="small">
                  <Edit style={{ fontSize: 14 }} />
                </IconButton>

                {/* <IconButton
                  size="small" className="tableDeleteIcon" onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[2]) }}>
                  <Icon
                    icon={baselineDeleteForever}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton> */}

                <IconButton onClick={() => this.delete(rowState.rowData[0])} size="small">
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
      //expandableRows: true,
      pagination: false,
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      setTableProps: () => ({ size: "small" }),
      // customToolbar: () => {
      //   return (
      //     <Button
      //       onClick={addGrade}
      //       variant="contained"
      //       color="primary"
      //       size="small"
      //     >
      //       + Add Grade to {modelName}
      //     </Button>
      //   );
      // },
      customToolbar: (rowData, rowMeta) => {
        // const data = {
        //   MakeId: rowData[1],
        //   ModelId: rowData[0],
        //   make: rowData[3],
        //   model: rowData[4],
        // };
        return (
          // <IconButton onClick={() => newDealFollowup()} size="small">
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

    return <RecordsList title={title} columns={columns} data={tableData} options={listOptions} borderRadius={"0px"} boxShadow={"none"} />;
  }
}

const mapStateToProps = () => {
  return;
};

export default connect(mapStateToProps, { show })(Index);
