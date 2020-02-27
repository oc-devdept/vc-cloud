import React from "react";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";

function TransactionList(props) {
  const { tableData, title } = props;
  const columns = [
    {
      label: "Name",
      name: "name"
    },
    {
      label: "Amount",
      name: "amount"
    },
    {
      label: "Status",
      name: "paid",
      options: {
        customBodyRender: value => (value ? "Paid" : "Pending")
      }
    },
    {
      label: "Paid On",
      name: "datePaid",
      options: {
        customBodyRender: value => (value ? getDateTime(value) : "")
      }
    },
    {
      label: "Transaction Date",
      name: "createdAt",
      options: {
        customBodyRender: value => getDateTime(value)
      }
    }
  ];

  const options = Object.assign({}, listOptions);
  options.search = false;
  options.filter = false;
  options.viewColumns = false;
  options.setTableProps = () => ({ size: "small" });

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={options}
    />
  );
}

export default TransactionList;
