import React, { PureComponent } from "react";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import { Edit, Delete } from "@material-ui/icons";
import { IconButton, Button } from "@material-ui/core";

export default class Index extends PureComponent {
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
      _DeleteTags,
      newTags
    } = this.props;

    const columns = [
      {
        name: "id",
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
        name: "tags",
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
                onClick={() => ToggleDialog("Edit_Tags", rowState.rowData)}
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
                size="small"
                onClick={() =>
                  _DeleteTags(
                    rowState.rowData[0],
                    rowState.rowData[2] ? rowState.rowData[2].length : 0
                  )
                }
              >
                <Delete fontSize="small" />
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
      selectableRowsOnClick: true,
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      setTableProps: () => ({ size: "small" }),
      pagination: false,
      customToolbar: () => {
        return (
          <Button onClick={newTags} variant="outlined" size="small">
            + Create Tag
          </Button>
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
