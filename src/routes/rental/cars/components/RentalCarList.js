import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import Image from "Components/Image";
import { Button, IconButton } from "@material-ui/core";
import { Edit, Visibility, Delete } from "@material-ui/icons";

export default function RentalCarList(props) {
  const {
    tableData,
    newRentalCar,
    editRentalCar,
    viewRentalCar,
    deleteRentalCar
  } = props;
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      name: "files",
      label: "Profile",
      options: {
        customBodyRender: value =>
          value.length > 0 ? <Image imageSource={value} single={true} /> : ""
      }
    },
    {
      label: "Name",
      name: "name"
    },

    {
      label: "Number of People",
      name: "person"
    },
    {
      label: "Category",
      name: "rentalCategory",
      options: {
        customBodyRender: value => {
          return value ? value.name : "";
        }
      }
    },
    {
      label: "Status",
      name: "status"
    },
    {
      label: "Transmission",
      name: "transmission"
    },

    {
      name: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (rowData, rowState) => {
          var rentalCarId = rowState.rowData[0];
          return (
            <React.Fragment>
              <IconButton
                onClick={() => viewRentalCar(rentalCarId)}
                className="mx-10"
                size="small"
              >
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => editRentalCar(rentalCarId)}
                className="mx-10"
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => deleteRentalCar(rentalCarId)}
                size="small"
                className="mx-10"
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
    customToolbar: () => (
      <Button variant="outlined" size="small" onClick={newRentalCar}>
        New Rental Car
      </Button>
    ),
    setTableProps: () => ({ size: "small" })
  });
  return <RecordsList columns={columns} data={tableData} options={options} />;
}
