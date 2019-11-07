import React from "react";
import { NavLink } from "react-router-dom";

//Component Req
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleDeal } from "Helpers/crmURL";
import RctSectionLoader from "Components/RctSectionLoader";
import StatusBadge from "Components/StatusBadge/StatusBadge";

import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

const DealList = ({ tableData, loading, title, action, noRelated }) => {
  const columns = [
    {
      name: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download: false
      }
    },
    {
      label: "Name",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink to={singleDeal(tableMeta.rowData[0])}>{value}</NavLink>
          );
        }
      }
    },
    {
      label: "Amount",
      name: "amount",
      options: {
        customBodyRender: value => {
          return (
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          );
        }
      }
    },
    {
      label: "Stage",
      name: "stageInfo",
      options: {
        customBodyRender: value => {
          return value.name ? (
            <StatusBadge
              name={value.name}
              color={value.color}
              value={value.name}
            />
          ) : (
            ""
          );
        }
      }
    },
    {
      label: "Chance",
      name: "stageInfo",
      options: {
        filter: false,
        customBodyRender: value => {
          return value ? value.chance : "";
        }
      }
    },
    {
      label: "Closing",
      name: "closingDate",
      options: {
        customBodyRender: value => {
          return value ? getTheDate(value) : "";
        }
      }
    },
    {
      label: "Account",
      name: "accountInfo",
      options: {
        display: noRelated ? "excluded" : true,
        customBodyRender: value => {
          return value ? (
            <NavLink to={`accounts/${value.id}`}>{value.name}</NavLink>
          ) : (
            ""
          );
        }
      }
    },
    {
      label: "Customer",
      name: "customerInfo",
      options: {
        display: noRelated ? "excluded" : true,
        customBodyRender: value => {
          return value ? (
            <NavLink to={`customers/${value.id}`}>{value.name}</NavLink>
          ) : (
            ""
          );
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
      label: "Source",
      name: "source",
      options: {
        display: false
      }
    },
    {
      label: "Type",
      name: "type",
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
  //           <React.Fragment>
  //             <Tooltip id="tooltip-icon" title="Edit">
  //               <IconButton
  //                 className="text-primary mr-2"
  //                 aria-label="Edit Lead"
  //                 onClick={() => {
  //                   this.toggleEditModal(value);
  //                 }}
  //               >
  //                 <i className="zmdi zmdi-edit" />
  //               </IconButton>
  //             </Tooltip>
  //           </React.Fragment>
  //         );
  //       }
  //     }
  //   });
  // }

  // listOptions.onRowClick = (rowData, rowMeta, rowIndex, colMeta) =>
  //   console.log(rowIndex, colMeta); //onRowClick(rowData[0]);
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

export default DealList;
