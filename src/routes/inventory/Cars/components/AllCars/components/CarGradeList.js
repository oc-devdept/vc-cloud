import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";
import Image from "Components/Image";
import Stock from "./Cars/Stock";

import { Edit, Delete } from "@material-ui/icons";
import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Switch
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const PurpleSwitch = withStyles({
  switchBase: {
    color: orange[300],
    "&$checked": {
      color: orange[500]
    },
    "&$checked + $track": {
      backgroundColor: orange[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const { addGrade, modelName, title, tableData } = this.props;
    console.log(this.props)
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "NAME",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        label: "IMAGE",
        name: "images",
        options: {
          customBodyRender: (value, tableMeta) => {
            if (value && value.length > 0) {
              return (
                <Image imageSource={value} single={true} thumbNail={true} />
              );
            } else {
              return "No image";
            }
          }
        }
      },
      {
        label: "COST PRICE",
        name: "cost_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        label: "SELLING PRICE",
        name: "selling_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        name: "EDIT",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            return (
              <IconButton
                onClick={() =>
                  this.props.ToggleDialog("Selected_Grade", rowState.rowData[0])
                }
                size="small"
              >
                <Edit style={{ fontSize: 14 }} />
              </IconButton>
            );
          }
        }
      },
      {
        name: "DELETE",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            return (
              <IconButton
                onClick={() => this.props.DeleteCar(rowState.rowData[0])}
                size="small"
              >
                <Delete style={{ fontSize: 14 }} />
              </IconButton>
            );
          }
        }
      }
    ];

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      expandableRows: true,
      pagination: false,
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      setTableProps: () => ({ size: "small" }),
      customToolbar: () => {
        return (
          <Button
            onClick={addGrade}
            variant="contained"
            color="primary"
            size="small"
          >
            + Add Grade to {modelName}
          </Button>
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
      }
    };

    return (
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
        borderRadius={"0px"}
        boxShadow={"none"}
      />
    );
  }
}
