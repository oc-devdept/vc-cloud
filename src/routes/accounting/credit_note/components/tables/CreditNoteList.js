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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CreditNoteList = ({ tableData, loading, title, action }) => {
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Customer",
      name: "customerName",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            // <NavLink to={`payments/${value.id}`}>{value.name}</NavLink>
            <NavLink to={`credit_notes/${tableMeta.rowData[0]}`}>
              {value}
            </NavLink>
          );
        }
      }
    },
    // {
    //   label: "# Invoice",
    //   name: "invoiceQuote",
    //   options: {
    //     customBodyRender: (value, tableMeta) => {
    //       return value
    //     }
    //   }
    // },
    {
      label: "Payment Method",
      name: "paymentMethod",
      options: {
        customBodyRender: (value, tableMeta) => {
          return value;
        }
      }
    },

    // {
    //   label: "Customer",
    //   name: "customerName",
    //   options: {
    //     customBodyRender: value => {
    //       return value
    //     }
    //   }
    // },
    {
      label: "Paid Amount",
      name: "amount",
      options: {
        customBodyRender: (value, tableMeta) => {
          return `$${numberWithCommas(value)}`;
        }
      }
    },
    {
      label: "Payment Ref",
      name: "paymentRef",
      options: {
        customBodyRender: value => {
          return value;
        }
      }
    },
    {
      label: "Payment Made",
      name: "date",
      options: {
        customBodyRender: value => {
          return Moment(new Date(value)).format("LL");
        }
      }
    }
    // {
    //   label: "Paid Off",
    //   name: "paidOff",
    //   options: {
    //     customBodyRender: value => {
    //       return `${value}`
    //     }
    //   }
    // },
    // {
    //   label: "Reconciled",
    //   name: "reconciled",
    //   options: {
    //     customBodyRender: value => {
    //       return `${value}`
    //     }
    //   }
    // },
    // {
    //   label: "Remaining Amount ",
    //   name: "duePayment",
    //   options: {
    //     customBodyRender: value => {
    //       return `$${value.toLocaleString()}`
    //     }
    //   }
    // },
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
    <BgCard fullBlock>
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

export default CreditNoteList;
