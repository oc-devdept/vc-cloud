import React from "react";
import { NavLink } from "react-router-dom";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

//Page req
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Moment from "moment";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing(1)
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BalancePayment = ({
  tableData,
  loading,
  title,
  onCheckList,
  onBalancePaymentCheck,
  balanceHandleChange
}) => {
  const classes = useStyles();

  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Select",
      name: "reconciled",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value.disabled) {
            return (
              <Checkbox
                checked={value}
                value="checkedA"
                onChange={event => {
                  onBalancePaymentCheck(tableMeta.rowIndex, value);
                }}
              />
            );
          } else {
            return (
              <Checkbox
                checked={value}
                value="checkedA"
                onChange={event => {
                  onBalancePaymentCheck(tableMeta.rowIndex, value);
                }}
              />
            );
          }
        }
      }
    },

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
      label: "Amount",
      name: "amount",
      options: {
        customBodyRender: (value, tableMeta) => {
          return `$${numberWithCommas(value)}`;
        }
      }
    },
    {
      label: "Allocation",
      name: "allocation",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <Input
              placeholder="Enter amount"
              // className={classes.input}
              value={value}
              style={{ margin: 0 }}
              onChange={e =>
                balanceHandleChange(e.target.value, tableMeta.rowIndex)
              }
            />
          );
        }
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

export default BalancePayment;
