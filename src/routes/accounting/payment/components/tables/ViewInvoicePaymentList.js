
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
import Checkbox from '@material-ui/core/Checkbox';
import AppConfig from 'Constants/AppConfig'
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ViewInvoicePaymentList = ({ tableData, loading, title, action, onCheckList }) => {


  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
        label: "Invoice",
        name: "invoiceId",
        options: { 
        customBodyRender: (value, tableMeta) => {
          if(value){
            return (
              <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
            );
          } else {
            return '-'
          }
          
        }
      },
    },
    {
        label: "Date",
        name: "dated",
        options: {
        customBodyRender: (value, tableMeta) => {
          if(value){
            return Moment(new Date(value)).format("LL");
          } else {
            return '-'
          }

        //   return (
        //     <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
        //   );
        }
      }
    },
    {
        label: "Due Date",
        name: "dueDate",
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value){
              return Moment(new Date(value)).format("LL");
            } else {
              return '-'
            }
          }
        }
    },
    {
        label: "Original Amount",
        name: "originalAmount",
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value){
              return `$${numberWithCommas(value)}`
            } else{
              return `-`
            }

          }
        }
    },

    {
      label: "Reconciled",
      name: "reconciled",
      options: {
        customBodyRender: (value, tableMeta) => {

          if(value){
            return (
              <Checkbox
                  checked={value}
                  disabled
                  color="primary"
                  style={{
                    color: AppConfig.themeColors.primary
                  }}
              />
            )
          } else {
            return (
              <Checkbox
                  checked={value}
                  disabled
              />
            )
          }
          
        },
      },
    },

    {
      label: "Allocation",
      name: "allocated",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return `$${numberWithCommas(value)}`
        },
      }
    },
    // {
    //     label: "Open Balance",
    //     name: "openBalance",
    //     options: {
    //       customBodyRender: (value, tableMeta) => {
    //         return `$${numberWithCommas(value)}`

    //         // return (
    //         //   <NavLink to={`invoices/${tableMeta.rowData[0]}`}>{value}</NavLink>
    //         // );
    //       }
    //     }
    // },
    
  

    // {
    //   label: "Total Invoices",
    //   name: "totalInvoices",
    //   options: {
    //     customBodyRender: value => {
    //       return value
    //     }
    //   }
    // },
    // {
    //   label: "Total Debit",
    //   name: "invoiceTotalAmt",
    //   options: {
    //     customBodyRender: (value, tableMeta) => {
    //       return `$${value.toLocaleString()}`

    //     }
    //   }
    // },
    // {
    //   label: "Total Paid",
    //   name: "invoiceTotalAmtPaid",
    //   options: {
    //     customBodyRender: value => {
    //       return `$${value.toLocaleString()}`
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

export default ViewInvoicePaymentList;
