import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import Image from "Components/Image";


export default function RentalCarList(props) {
  const {
    tableData
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
    }    
  ];

  const options = Object.assign({}, listOptions, {    
    setTableProps: () => ({ size: "small" }),
    onRowClick: (rowData, rowMeta) => {
        props.onSelect(props.target, rowData[0]);
        props.handleHide();
      }
  });
  return <RecordsList columns={columns} data={tableData} options={options} />;
}
