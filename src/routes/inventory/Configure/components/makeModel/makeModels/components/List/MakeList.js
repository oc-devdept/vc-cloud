import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import { Edit, Delete } from "@material-ui/icons";
import { TableRow, TableCell, IconButton, Button } from "@material-ui/core";

import ModelList from "./ModelList";
import Images from "Components/Image";

export default class MakeList extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const {
      loading,
      title,
      tableData,
      ToggleDialog,
      _DeleteModel,
      newMake
    } = this.props;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },

      {
        label: "CAR MAKE",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },

      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: value => {
            // return value;
            if (value.length > 0) {
              return <Images imageSource={value} single={true} />;
            } else {
              return null;
            }
          }
        }
      },
      {
        name: "commissionId",
        options: { display: "excluded", filter: false, sort: false }
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
                size="small"
                onClick={() => ToggleDialog("Edit_Make", rowState.rowData)}
              >
                <Edit fontSize="small" />
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
                onClick={() =>
                  _DeleteModel(
                    rowState.rowData[0],
                    rowState.rowData[7] ? rowState.rowData[7].length : 0
                  )
                }
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            );
          }
        }
      },
      {
        name: "category",
        options: { display: "excluded", filter: false, sort: false }
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
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{ padding: 20 }}>
              <ModelList
                id={rowData[0]}
                Make={rowData[1]}
                ToggleDialog={ToggleDialog}
                _DeleteModel={_DeleteModel}
              />
              <hr />
            </TableCell>
          </TableRow>
        );
      },
      customToolbar: () => {
        return (
          <Button onClick={newMake} variant="outlined" size="small">
            + Create Make
          </Button>
        );
      },
      setTableProps: () => ({ size: "small" })
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
