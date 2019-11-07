import React from "react";
import { NavLink } from "react-router-dom";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

//Page req
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import Moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import AppConfig from "Constants/AppConfig";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ViewInvoiceReconcile = ({
  tableData,
  loading,
  title,
  action,
  onCheckList
}) => {
  const columns = [
    {
      name: "credit_id",
      options: { display: "excluded", filter: false, sort: false }
    },

    // {
    //     label: `Payment #${tableMeta.rowData[0]}`,
    //     name: "credit_id",
    //     options: {
    //       customBodyRender: (value, tableMeta) => {
    //         return (
    //           <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
    //         );
    //       }
    //     }
    // },

    // {
    //   label: "Invoice",
    //   name: "quoteID",
    //   options: {
    //     customBodyRender: (value, tableMeta) => {
    //       if(value) {
    //         return <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
    //       } else {
    //         return '-'
    //       }
    //     }
    //   },
    // },

    {
      label: "Type",
      name: "type",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },

    {
      label: "Amount",
      name: "amount",
      options: {
        customBodyRender: (value, tableMeta) => {
          return `$${numberWithCommas(value)}`;
        }
      }
    },

    {
      label: "Date",
      name: "updatedAt",
      options: {
        customBodyRender: (value, tableMeta) => {
          return Moment(new Date(value)).format("LL");
          //   return (
          //     <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
          //   );
        }
      }
    },

    {
      label: "Reconciled",
      name: "reconciled",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return (
              <Checkbox
                checked={value}
                disabled
                color="primary"
                style={{
                  color: AppConfig.themeColors.primary
                }}
              />
            );
          } else {
            return <Checkbox checked={value} disabled />;
          }
        }
      }
    }
  ];

  if (action == true) {
    columns.push({
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <React.Fragment>
              <Tooltip id="tooltip-icon" title="Edit">
                <IconButton
                  className="text-primary mr-2"
                  aria-label="Edit Lead"
                  onClick={() => {
                    this.toggleEditModal(value);
                  }}
                >
                  <i className="zmdi zmdi-edit" />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          );
        }
      }
    });
  }

  listOptions.customToolbarSelect = (
    selectedRows,
    displayData,
    setSelectRows
  ) =>
    // delete multiple function
    null;

  return (
    <BgCard
      fullBlock
      customStyles={{ boxShadow: "none", borderRadius: 0, marginTop: 25 }}
    >
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
      />
      {loading && <RctSectionLoader />}
    </BgCard>
  );
};

export default ViewInvoiceReconcile;
