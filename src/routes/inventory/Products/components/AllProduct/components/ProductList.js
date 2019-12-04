import React, {PureComponent} from "react";
import { NavLink } from "react-router-dom";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import Moment from "moment";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default class Index extends PureComponent {

  render () {
    
    const { loading, title, _HandleProduct, tableData } = this.props
    
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "productVariant",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "SKU",
        name: "id",
        options: {
          customBodyRender: (value, tableMeta) => {
            return (
              <NavLink to={`quotations/${tableMeta.rowData[0]}`}>{value}</NavLink>
            );
          }
        }
      },
      {
        label: "Make",
        name: "make",
        options: {
          customBodyRender: value => {
            return value
          }
        }
      },
      {
        label: "Model",
        name: "model",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        label: "Name",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Cost Price",
        name: "cost_Price",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Selling Price",
        name: "selling_Price",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Active",
        name: "isActive",
        options: {
          customBodyRender: value => {
            return `${value}`;
          }
        }
      },
    
    ]

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      expandableRows: true, // Try Adding This
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        return (
          <TableRow>
            <TableCell colSpan={rowData.length}>
              <div>
                Show all product variants

              </div>
            </TableCell>
          </TableRow>
        );
      }
    };

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
  }
};
