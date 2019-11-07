import React from "react";
import { NavLink } from "react-router-dom";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

//Page req
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import Moment from "moment";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const InvoicesOneCompany = ({ tableData, loading, title, action, onCheckList, handleChange}) => {

  const classes = useStyles();

  const columns = [
    {
      name: "invoiceId",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Invoice",
      name: "invoiceQuote",
      options: { 
        customBodyRender: (value, tableMeta) => {
          return (
            value
            // <NavLink to={`payments/${value.id}`}>{value.name}</NavLink>
            // <NavLink to={`payments/${tableMeta.rowData[0]}`}>{value.name}</NavLink>
          );
        }
      },
    },
    {
      label: "Date",
      name: "dated",
      options: {
        customBodyRender: (value, tableMeta) => {
          return Moment(new Date(value)).format("LL");

        }
      }
    },
    {
      label: "Due Date",
      name: "dueDate",
      options: {
        customBodyRender: (value, tableMeta) => {
          return Moment(new Date(value)).format("LL");

        }
      }
    },

    {
      label: "Original Amount",
      name: "originalAmount",
      options: {
        customBodyRender: (value, tableMeta) => {
          return `$${numberWithCommas(value)}`
        }
      }
    },
    {
      label: "Open Balance",
      name: "openBalance",
      options: {
        customBodyRender: value => {
          return `$${numberWithCommas(value)}`
        }
      }
    },

    {
      label: "Reconciled",
      name: "reconciled",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          
          if(value.disabled){
            return (
              <Checkbox
                checked={value}
                value="checkedA"
                onChange={event => {
                  onCheckList(tableMeta.rowIndex, value)
                }}
              />
            )
          } else {
            return (
              <Checkbox
                checked={value}
                value="checkedA"
                onChange={event => {
                  onCheckList(tableMeta.rowIndex, value)
                }}
              />
            )
          }
          
        },
      },
  },
    
  {
    label: "Amount",
    name: "amount",
    options: {
      customBodyRender: (value, tableMeta) => {
        // return `$${numberWithCommas(value)}`
        return (
          <Input
            placeholder="Enter amount"
            // className={classes.input}
            value={value}
            style={{margin:0}}
            onChange={(e)=> handleChange(e.target.value, tableMeta.rowIndex)}
          />
        )
      }
    }
  },
    

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

export default InvoicesOneCompany;

