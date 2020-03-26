import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ProductOptionValueList from "./ProductOptionValueList";

import { Edit, Delete } from "@material-ui/icons";
import { TableRow, TableCell, Button, IconButton } from "@material-ui/core";

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const { loading, title, tableData, ToggleDialog, addOption } = this.props;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "selectOne",
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
              name: rowState.rowData[3],
              selectOne: rowState.rowData[1]
            };

            return (
              <IconButton
                size="small"
                onClick={() => ToggleDialog("Edit_ProductOption", data)}
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
            if (rowState.rowData[2].length == 0) {
              const data = {
                id: rowState.rowData[0],
                name: rowState.rowData[3],
                selectOne: rowState.rowData[1]
              };

              return (
                <IconButton
                  size="small"
                  onClick={() => ToggleDialog("Delete_ProductOption", data)}
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
          <Button onClick={addOption} variant="outlined" size="small">
            + Create Equipment
          </Button>
        );
      },
      setTableProps: () => ({ size: "small" }),
      renderExpandableRow: rowData => {
        const data = {
          id: rowData[0],
          name: rowData[3],
          selectOne: rowData[1]
        };
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{ padding: 0 }}>
              <ProductOptionValueList
                addOptionValue={() =>
                  ToggleDialog("Create_ProductOptionValue", data)
                }
                tableData={rowData[2]}
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
