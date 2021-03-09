import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions, getTheDate, getDateTime } from "Helpers/helpers";

import { IconButton } from "@material-ui/core";
import { Add, Delete, Visibility } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

export default function RentalList(props) {
  const { tableData, viewBooking } = props;
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },

    {
      label: "Car Enquiry",
      name: "content",
      options: {
        customBodyRender: value => {
          return value ? value.model : "";
        }
      }
    },

    {
      label: "Customer Name",
      name: "contact",
      options: {
        customBodyRender: value => {
          return value ? `${value.firstName} ${value.lastName}` : "";
        }
      }
    },
    {
      label: "Contact email",
      name: "contact",
      options: {
        customBodyRender: value => {
          return value ? value.email : "";
        }
      }
    },
    {
      label: "Status",
      name: "status"
    },
    {
      label: "Booking Date",
      name: "content",
      options: {
        customBodyRender: value => {
          return value ? getTheDate(value.date) : "";
        }
      }
    },
    {
      label: "Enquired On",
      name: "created_at",
      options: {
        customBodyRender: value => {
          return value ? getDateTime(value) : "";
        }
      }
    },

    {
      name: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (rowData, rowState) => {
          var bookingId = rowState.rowData[0];
          return (
            <React.Fragment>
              <IconButton
                onClick={() => viewBooking(bookingId)}
                className="mx-10"
                size="small"
              >
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton size="small" className="mx-10">
                <Delete fontSize="small" />
              </IconButton>
            </React.Fragment>
          );
        }
      }
    }
  ];

  const options = Object.assign({}, listOptions, {
    setTableProps: () => ({ size: "small" }),
    customToolbar: () => (
      <Tooltip id="tooltip-icon" title={"Add Rental"}>
          <IconButton className="mr-2" aria-label={"Add Rental"} onClick={props.newBooking}>
              <Add />
          </IconButton>
      </Tooltip>
    )
  });
  

  return <RecordsList columns={columns} data={tableData} options={options} />;
}
