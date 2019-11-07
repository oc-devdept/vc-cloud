import React from "react";
import { NavLink } from "react-router-dom";

// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleAccount } from "Helpers/crmURL";
import RctSectionLoader from "Components/RctSectionLoader";

import ActiveStatusBadge from "Components/StatusBadge/ActiveStatusBadge";

const AccountList = ({ tableData, loading, title, action }) => {
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Name",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink to={singleAccount(tableMeta.rowData[0])}>{value}</NavLink>
          );
        }
      }
    },
    { label: "Industry", name: "industry" },
    { label: "Website", name: "website" },
    { label: "Office", name: "phone" },
    {
      label: "Status",
      name: "isActive",
      options: {
        customBodyRender: value => {
          return <ActiveStatusBadge isActive={value} />;
        }
      }
    },
    {
      label: "Owner",
      name: "userInfo",
      options: {
        customBodyRender: value => {
          return value ? value.name : "";
        }
      }
    },
    {
      label: "Fax",
      name: "fax",
      options: {
        display: false
      }
    }
  ];

  // if (action == true) {
  //   columns.push({
  //     name: "Actions",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       customBodyRender: value => {
  //         return (
  //           <Tooltip id="tooltip-icon" title="Edit">
  //             <IconButton
  //               className="text-primary mr-2"
  //               aria-label="Edit Account"
  //               onClick={() => {
  //                 this.toggleEditModal(value);
  //               }}
  //             >
  //               <i className="zmdi zmdi-edit" />
  //             </IconButton>
  //           </Tooltip>
  //         );
  //       }
  //     }
  //   });
  // }

  // listOptions.onRowClick = rowData => onRowClick(rowData[0]);
  listOptions.customToolbarSelect = (
    selectedRows,
    displayData,
    setSelectRows
  ) =>
    // delete multiple function
    null;

  return (
    <div className="rct-block">
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
      />
      {loading && <RctSectionLoader />}
    </div>
  );
};

export default AccountList;
