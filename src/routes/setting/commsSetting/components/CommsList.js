import React from "react";
import RecordsList from "Components/RecordsList";
import { Button, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { listOptions } from "Helpers/helpers";
import NumberFormat from "react-number-format";

export default function CommsList(props) {
  const { tableData, showDialog, deleteAction } = props;

  const columns = [
    { name: "name", label: "Name" },
    {
      name: "commission",
      label: "Commission Value",
      options: {
        customBodyRender: value => (
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        )
      }
    },
    {
      label: " ",
      name: "id",
      options: {
        setCellProps: () => ({ className: "text-center" }),
        customBodyRender: value => {
          return (
            <React.Fragment>
              <IconButton
                className="mx-10"
                size="small"
                onClick={() => showDialog(value)}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                className="mx-10 text-danger"
                size="small"
                onClick={() => deleteAction(value)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </React.Fragment>
          );
        }
      }
    }
  ];

  const options = Object.assign({}, listOptions, {
    sort: false,
    search: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    customToolbar: () => {
      return (
        <Button onClick={() => showDialog()} variant="outlined" size="small">
          New Log
        </Button>
      );
    },
    setTableProps: () => ({ size: "small" })
  });

  return <RecordsList columns={columns} data={tableData} options={options} />;
}
