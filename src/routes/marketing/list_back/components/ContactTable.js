import React from "react";
import RecordsList from "Components/RecordsList";

function ContactTable(props) {
  const { tableData, columns, onSelectRow, resetSelected } = props;

  const listOptions = {
    filterType: "multiselect",
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
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true
    },
    isRowSelectable: dataIndex => {
      return tableData[dataIndex].disable != true;
    },
    customToolbarSelect: () => {}
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

  return (
    <RecordsList columns={columns} data={tableData} options={listOptions} />
  );
}

export default ContactTable;
