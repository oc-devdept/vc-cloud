import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";
import { Edit, Delete } from "@material-ui/icons";

import { Button, IconButton } from "@material-ui/core";

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const {
      addDetailsValue,
      detailGroupName,
      tableData,
      ToggleDialog
    } = this.props;

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "values",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "Name",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Unit",
        name: "unit",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Type",
        name: "type",
        options: {
          customBodyRender: value => {
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
            const data = {
              id: rowState.rowData[0],
              name: rowState.rowData[2],
              unit: rowState.rowData[3],
              type: rowState.rowData[4]
            };
            return (
              <IconButton
                onClick={() => ToggleDialog("Edit_Detail_Value", data)}
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
            const data = {
              id: rowState.rowData[0],
              name: rowState.rowData[2],
              unit: rowState.rowData[3],
              type: rowState.rowData[4]
            };
            return (
              <IconButton
                onClick={() => ToggleDialog("Delete_Detail_Value", data)}
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
      expandableRows: false, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      pagination: false,
      customToolbar: () => {
        return (
          <Button onClick={addDetailsValue} variant="outlined" size="small">
            + Add to {detailGroupName}
          </Button>
        );
      },
      setTableProps: () => ({ size: "small" })
    };

    return (
      <div>
        <RecordsList
          title={"Car Specification Units"}
          columns={columns}
          data={tableData}
          options={listOptions}
          borderRadius={"0px"}
          boxShadow={"none"}
        />
      </div>
    );
  }
}
