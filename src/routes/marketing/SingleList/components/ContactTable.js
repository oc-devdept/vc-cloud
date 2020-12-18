import React from "react";
import RecordsList from "Components/RecordsList";
import Button from "@material-ui/core/Button";

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      for (let a = 0; a < list.length; a++) {
        let value = list[a];
        filter.push({ [property]: value });
      }
    }
  }
  return filter;
}

function ContactTable(props) {
  const { tableData, columns, onSelectRow, totalCount,
    tableStateChange, isServer, searchText, filterList, handleFilterSubmit } = props;

  const listOptions = {
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    elevation: 0,
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 30, 60, 100],
    textLabels: { body: { noMatch: "No data to display" } },
    selectableRowsOnClick: true,
    onRowsSelect: (currentRowSelected, allRowsSelected) => {
      onSelectRow(currentRowSelected);
    },
    serverSide: true,
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true
    },
    // isRowSelectable: dataIndex => {
    //   return tableData[dataIndex].disable != true;
    // },
    customToolbarSelect: () => { },
    serverSide: isServer,
    sort: false,
    customFilterDialogFooter: filters => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button
            className="btn-success text-white"
            variant="contained"
            onClick={() => { 
              const filter = getFilters(filters, columns);
              handleFilterSubmit(filters, filter);
            } }
          >
            Search
          </Button>
        </div>
      );
    },
    onFilterChange: (col, filters, type) => {
      if (type == "chip") {
        const filter = getFilters(filters, columns);
        handleFilterSubmit(filters, filter);
      }
    }
    // onTableChange: (action, tableState) => {
    //   // if (resetSelected) {
    //   // }
    //   console.log(action);
    //   console.log(tableState);
    //   return {
    //     ...tableState,
    //     selectedRows: { ...tableState.selectedRows, data: [] }
    //   };
    // }
  };

  if (isServer) {
    listOptions.count = totalCount;
    listOptions.search = true;
    listOptions.searchText = searchText;
    listOptions.onSearchChange = props.onSearchChange;
    listOptions.onSearchClose = props.onSearchClose;
    listOptions.rowsSelected = props.rowsSelected;
    listOptions.serverSideFilterList = filterList;
    listOptions.onTableChange = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      let filter;
      switch (action) {
        case "propsUpdate":
          //tableState.filterList = tableVars.filters;
          break;
        case "changePage":
        case "changeRowsPerPage":       
          filter = getFilters(tableState.filterList, tableState.columns);
          tableStateChange(limit, skip, tableState.filterList, filter, tableState.columns);
          break;        
        case "rowsSelect":
          //console.log(tableState.rowsSelected);
          break;
      }
    };
  }

  return (
    <React.Fragment>
    <RecordsList columns={columns} data={tableData} options={listOptions} />
    </React.Fragment>
  );
}

export default ContactTable;
