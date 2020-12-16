import React from "react";

import BgCard from "Components/BgCard";
import RecordsList from "Components/RecordsList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd, Edit, Delete } from "@material-ui/icons";

const UsersList = ({ tableData, newUser, editUser, deleteUser, totalCount, updateTableState, onFilterChange, onSearchChange, onSearchClose, searchText }) => {
  const columns = [
    {
      label: "Name",
      name: "name"
    },
    { label: "Email", name: "email" },

    {
      label: "Actions",
      name: "id",
      options: {
        filter: false,
        customBodyRender: value => {
          return (
            <React.Fragment>
              <Tooltip id="tooltip-icon" title="Edit User">
                <IconButton
                  aria-label="More Options"
                  style={{ padding: 6 }}
                  onClick={() => {
                    editUser(value);
                  }}
                >
                  <Edit style={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          );
        }
      }
    }
  ];

  const options = {
    filterType: "multiselect",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 15,
    viewColumns: false,
    rowsPerPageOptions: [15, 30, 60, 100],
    textLabels: { body: { noMatch: "No data to display" } },
    serverSide: true,
    count: totalCount,
    onTableInit: (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      if (action == "tableInitialized") {
        updateTableState({
          limit,
          skip,
          serverSideFilterList: tableState.filterList,
          columns: tableState.columns
        });        
      }
    },
    onTableChange: (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      switch (action) {
        case "propsUpdate":
          //tableState.filterList = this.state.serverSideFilterList;
          break;
        case "changePage":
        case "changeRowsPerPage":
          //filter = getFilters(tableState.filterList, tableState.columns);
          updateTableState({ limit, skip });          
          break;
      }
    },
    onFilterChange: onFilterChange,
    onSearchChange: onSearchChange,
    onSearchClose: onSearchClose,
    search: true,
    searchText: searchText,    
    customToolbar: () => (
      <React.Fragment>
      <Tooltip id="tooltip-icon" title="Add User">
        <IconButton className="mr-2" aria-label="Add User" onClick={newUser}>
          <PersonAdd />
        </IconButton>
      </Tooltip>    
    </React.Fragment>
    )
  };

  return (
    <BgCard fullBlock>
      <RecordsList
        title={"All Users"}
        columns={columns}
        data={tableData}
        options={options}
      />
    </BgCard>
  );
};

export default UsersList;
