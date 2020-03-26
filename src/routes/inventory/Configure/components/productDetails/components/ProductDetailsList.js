import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ProductDetailsValueList from "./ProductDetailsValueList";

import { Edit, Delete } from "@material-ui/icons";
import { TableRow, TableCell, Button, IconButton } from "@material-ui/core";

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const { loading, title, tableData, ToggleDialog, addSpecs } = this.props;

    const columns = [
      {
        name: "value",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "objects",
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
        name: "EDIT",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            const data = {
              id: rowState.rowData[0],
              name: rowState.rowData[2]
            };
            return (
              <IconButton
                onClick={() => ToggleDialog("Edit_Detail", data)}
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
            if (rowState.rowData[1].length == 0) {
              const data = {
                id: rowState.rowData[0],
                name: rowState.rowData[2]
              };

              return (
                <IconButton
                  onClick={() => ToggleDialog("Delete_Detail", data)}
                  size="small"
                >
                  <Delete style={{ fontSize: 14 }} />
                </IconButton>
              );
            } else {
              return null;
            }
          }
        }
      }
    ];

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      expandableRows: true, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      customToolbar: () => {
        return (
          <Button onClick={addSpecs} variant="outlined" size="small">
            + Create Specification
          </Button>
        );
      },
      setTableProps: () => ({ size: "small" }),
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{ padding: 0 }}>
              <ProductDetailsValueList
                detailGroupName={rowData[2]}
                addDetailsValue={() =>
                  ToggleDialog("Create_Detail_Value", [rowData[0], rowData[2]])
                }
                tableData={rowData[1]}
                ToggleDialog={ToggleDialog}
              />
            </TableCell>
          </TableRow>
        );
      }
    };

    return (
      <div>
        <BgCard fullBlock>
          <RecordsList
            title={title}
            columns={columns}
            data={tableData}
            options={listOptions}
          />
          {loading && <RctSectionLoader />}
        </BgCard>
      </div>
    );
  }
}
